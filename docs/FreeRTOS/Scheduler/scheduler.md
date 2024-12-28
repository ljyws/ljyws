---
id: freertos_scheduler
title: FreeRTOS Scheduler
sidebar_label: Scheduler
---

## FreeRTOS Scheduler

FreeRTOS的调度原理和内核相关，因此也需要有一些Cortex-M内核相关的知识。

### 一些概念
- 在Cortex-M内核中，使用Systick作为心跳时钟，一般默认是1ms。
- 进入Systick中断后，内核会在系统的就绪列表中从高优先级开始找需要执行的任务，如果任务状态发生了变化，就会产生一个PendSV中断，内核会在PendSV中断中,改变进程的栈指针PSP，进行任务切换。

### Systick
对于一个系统来说，时钟是系统能够运转的核心，也就是调度器的核心了。因此，我们可以来研究一下Systick

在FreeRTOS中，Systick的初始化函数为：vPortSetupTimerInterrupt，也就是：
```
void vPortSetupTimerInterrupt( void )
{
	/* Calculate the constants required to configure the tick interrupt. */
	#if( configUSE_TICKLESS_IDLE == 1 )
	{
		ulTimerCountsForOneTick = ( configSYSTICK_CLOCK_HZ / configTICK_RATE_HZ );
		xMaximumPossibleSuppressedTicks = portMAX_24_BIT_NUMBER / ulTimerCountsForOneTick;
		ulStoppedTimerCompensation = portMISSED_COUNTS_FACTOR / ( configCPU_CLOCK_HZ / configSYSTICK_CLOCK_HZ );
	}
	#endif

	portNVIC_SYSTICK_CTRL_REG = 0UL;
	portNVIC_SYSTICK_CURRENT_VALUE_REG = 0UL;

	portNVIC_SYSTICK_LOAD_REG = ( configSYSTICK_CLOCK_HZ / configTICK_RATE_HZ ) - 1UL;
	portNVIC_SYSTICK_CTRL_REG = ( portNVIC_SYSTICK_CLK_BIT | portNVIC_SYSTICK_INT_BIT | portNVIC_SYSTICK_ENABLE_BIT );
}

```


而Systick的中断服务函数是：xPortSysTickHandler：
```
void xPortSysTickHandler( void )
{
	portDISABLE_INTERRUPTS();
	{
		if( xTaskIncrementTick() != pdFALSE )
		{
			portNVIC_INT_CTRL_REG = portNVIC_PENDSVSET_BIT;
		}
	}
	portENABLE_INTERRUPTS();
}

```

可以看到 中断服务函数里面使用了xTaskIncrementTick()函数，好好研究一下，该函数原型：

```
BaseType_t xTaskIncrementTick( void )
{
    /* 1. 创建一个临时任务块 */
    TCB_t * pxTCB;

    /* 2. 定义了一个存储某个任务状态列表项里的值，这个值通常表示任务的延迟时间或者超时时间，也就是任务要等待多少个滴答数才从阻塞转为就绪 */
    TickType_t xItemValue;

    /* 3. 定义了一个布尔类型的变量，用于表示是否需要进行任务切换 */
    BaseType_t xSwitchRequired = pdFALSE;

    /* 4. 记录更新当前的时钟节拍数 */
	traceTASK_INCREMENT_TICK( xTickCount );

    /* 5. 用来判断调度器是否被挂起，因为当调度器被挂起的时候，不会发生任务切换 */
	if( uxSchedulerSuspended == ( UBaseType_t ) pdFALSE )
	{

    /* 6. 如果没有被挂起 则把计时器加一，表示下一个节拍 */
		const TickType_t xConstTickCount = xTickCount + ( TickType_t ) 1;

	/* 7. 更新当前的时钟节拍数 */
		xTickCount = xConstTickCount;

        /* 8. 如果节拍数等于0 */
		if( xConstTickCount == ( TickType_t ) 0U )
		{

            /* 9. 切换延迟任务列表 */
			taskSWITCH_DELAYED_LISTS();
		}
		else
		{
            /* 10. 否则标记测试覆盖率 */
			mtCOVERAGE_TEST_MARKER();
		}

        /* 11. 如果当前的节拍数大于或等于下一个任务解除阻塞的时间 */
		if( xConstTickCount >= xNextTaskUnblockTime )
		{
			for( ;; )
			{
                /* 12. 检查延迟任务列表是否为空 */
				if( listLIST_IS_EMPTY( pxDelayedTaskList ) != pdFALSE )
				{
                    /* 13. 如果延迟任务列表为空，则下一个任务的阻塞时间设置为无限大 */
					xNextTaskUnblockTime = portMAX_DELAY;
					break;
				}
				else
				{
					pxTCB = listGET_OWNER_OF_HEAD_ENTRY( pxDelayedTaskList );
					xItemValue = listGET_LIST_ITEM_VALUE( &( pxTCB->xStateListItem ) );
					if( xConstTickCount < xItemValue )
					{
						xNextTaskUnblockTime = xItemValue;
						break;
					}
					else
					{
						mtCOVERAGE_TEST_MARKER();
					}

					/* It is time to remove the item from the Blocked state. */
					( void ) uxListRemove( &( pxTCB->xStateListItem ) );

					/* Is the task waiting on an event also?  If so remove
					it from the event list. */
					if( listLIST_ITEM_CONTAINER( &( pxTCB->xEventListItem ) ) != NULL )
					{
						( void ) uxListRemove( &( pxTCB->xEventListItem ) );
					}
					else
					{
						mtCOVERAGE_TEST_MARKER();
					}

					/* Place the unblocked task into the appropriate ready
					list. */
					prvAddTaskToReadyList( pxTCB );

					/* A task being unblocked cannot cause an immediate
					context switch if preemption is turned off. */
					#if (  configUSE_PREEMPTION == 1 )
					{
						/* Preemption is on, but a context switch should
						only be performed if the unblocked task has a
						priority that is equal to or higher than the
						currently executing task. */
						if( pxTCB->uxPriority >= pxCurrentTCB->uxPriority )
						{
							xSwitchRequired = pdTRUE;
						}
						else
						{
							mtCOVERAGE_TEST_MARKER();
						}
					}
					#endif /* configUSE_PREEMPTION */
				}
			}
		}

		/* Tasks of equal priority to the currently running task will share
		processing time (time slice) if preemption is on, and the application
		writer has not explicitly turned time slicing off. */
		#if ( ( configUSE_PREEMPTION == 1 ) && ( configUSE_TIME_SLICING == 1 ) )
		{
			if( listCURRENT_LIST_LENGTH( &( pxReadyTasksLists[ pxCurrentTCB->uxPriority ] ) ) > ( UBaseType_t ) 1 )
			{
				xSwitchRequired = pdTRUE;
			}
			else
			{
				mtCOVERAGE_TEST_MARKER();
			}
		}
		#endif /* ( ( configUSE_PREEMPTION == 1 ) && ( configUSE_TIME_SLICING == 1 ) ) */

		#if ( configUSE_TICK_HOOK == 1 )
		{
			/* Guard against the tick hook being called when the pended tick
			count is being unwound (when the scheduler is being unlocked). */
			if( xPendedTicks == ( TickType_t ) 0 )
			{
				vApplicationTickHook();
			}
			else
			{
				mtCOVERAGE_TEST_MARKER();
			}
		}
		#endif /* configUSE_TICK_HOOK */

		#if ( configUSE_PREEMPTION == 1 )
		{
			if( xYieldPending != pdFALSE )
			{
				xSwitchRequired = pdTRUE;
			}
			else
			{
				mtCOVERAGE_TEST_MARKER();
			}
		}
		#endif /* configUSE_PREEMPTION */
	}
	else
	{
		++xPendedTicks;

		/* The tick hook gets called at regular intervals, even if the
		scheduler is locked. */
		#if ( configUSE_TICK_HOOK == 1 )
		{
			vApplicationTickHook();
		}
		#endif
	}

	return xSwitchRequired;
}
```