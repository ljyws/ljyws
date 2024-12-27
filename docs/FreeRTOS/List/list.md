---
id: freertos_list
title: FreeRTOS List
sidebar_label: List
---

https://zhuanlan.zhihu.com/p/10011354931
## FreeRTOS 链表

### 定义
在FreeRTOS内核中，使用的是双向链表。链表数据结构结构体定义如下：
```
struct xLIST;
struct xLIST_ITEM
{
	listFIRST_LIST_ITEM_INTEGRITY_CHECK_VALUE
	configLIST_VOLATILE TickType_t xItemValue;
	struct xLIST_ITEM * configLIST_VOLATILE pxNext;	
	struct xLIST_ITEM * configLIST_VOLATILE pxPrevious;	
	void * pvOwner;
	struct xLIST * configLIST_VOLATILE pxContainer;
	listSECOND_LIST_ITEM_INTEGRITY_CHECK_VALUE
};
typedef struct xLIST_ITEM ListItem_t;
```

其中：
 - listFIRST_LIST_ITEM_INTEGRITY_CHECK_VALUE: 这是一个用于数据完整性检查的值，当配置宏被设置为 1 时，这个值会被设置为一个已知的值。这是 FreeRTOS 的一项安全特性，用于检测链表数据是否被意外修改。

 - TickType_t xItemValue:这是一个 TickType_t 类型的变量，用于存储链表项的值。在大多数情况下，这个值用于对链表进行排序，通常是降序排列

 - pxNext: 指向链表中下一个 xLIST_ITEM 的指针。

 - pxPrevious: 指向链表中上一个 xLIST_ITEM 的指针

 - pvOwner: 指向包含该链表项的对象的指针，通常是一个任务控制块（TCB）。这样，包含链表项的对象和链表项本身之间就形成了双向链接

 - pxContainer: 指向包含该链表项的链表的指针,指本链表被挂载到的链表指针

 - listSECOND_LIST_ITEM_INTEGRITY_CHECK_VALUE: 用于数据完整性检查的值

而内核中这些链表则是由xLIST来管理的，xLIST的结构体定义如下：
```
typedef struct xLIST
{
	volatile UBaseType_t uxNumberOfItems;
	ListItem_t * configLIST_VOLATILE pxIndex;
	MiniListItem_t xListEnd;					
} List_t;
```
其中：  
- uxNumberOfItems：是一个计数器，用于跟踪链表项目中也就是节点的数量
- pxIndex: 指向链表中最后一个插入或删除的节点的指针。
- xListEnd: 是一个 MiniListItem_t 类型的结构体，它是链表的末尾。它是一个迷你链表项，不包含任何实际的数据，只是用于表示链表的末尾。


### 初始化
链表是在创建新任务时被初始化的，在xTaskCreate的时候，会调用prvAddNewTaskToReadyList函数，而在prvAddNewTaskToReadyList函数里，
```
if( uxCurrentNumberOfTasks == ( UBaseType_t ) 1 )
{
	prvInitialiseTaskLists();
}
else
{
	mtCOVERAGE_TEST_MARKER();
}
```
这段的意思就是检查 uxCurrentNumberOfTasks 的值，并根据是否是第一个任务来决定是否调用 prvInitialiseTaskLists 函数。
因此，意味着只有在系统启动并创建第一个任务的时候才会初始化链表。，也就是调用prvInitialiseTaskLists 

prvInitialiseTaskLists 函数原型为：  
```
static void prvInitialiseTaskLists( void )
{
    //定义一个变量来存储任务的优先级
    UBaseType_t uxPriority;

    //遍历一遍所有的优先级
	for( uxPriority = ( UBaseType_t ) 0U; uxPriority < ( UBaseType_t ) configMAX_PRIORITIES; uxPriority++ )
	{
        //对于每个优先级，使用 vListInitialise 函数初始化一个就绪任务列表。pxReadyTasksLists 是一个数组，每个元素都是一个列表，用于存储具有相同优先级且处于就绪状态的任务。
		vListInitialise( &( pxReadyTasksLists[ uxPriority ] ) );
	}

    //初始化两个延时任务列表，xDelayedTaskList1 和 xDelayedTaskList2。这两个列表用于存储因为延时而暂时不可执行的任务
	vListInitialise( &xDelayedTaskList1 );
	vListInitialise( &xDelayedTaskList2 );

    //初始化一个待处理就绪任务列表，用于存储那些即将进入就绪状态的任务
	vListInitialise( &xPendingReadyList );

    //这是一个条件编译块，如果配置宏 INCLUDE_vTaskDelete 被设置为 1（表示支持任务删除功能），则初始化一个等待终止的任务列表 xTasksWaitingTermination。
	#if ( INCLUDE_vTaskDelete == 1 )
	{
		vListInitialise( &xTasksWaitingTermination );
	}
	#endif /* INCLUDE_vTaskDelete */

    //这是另一个条件编译块，如果配置宏 INCLUDE_vTaskSuspend 被设置为 1（表示支持任务挂起功能），则初始化一个挂起任务列表 xSuspendedTaskList。
	#if ( INCLUDE_vTaskSuspend == 1 )
	{
		vListInitialise( &xSuspendedTaskList );
	}
	#endif /* INCLUDE_vTaskSuspend */

    //初始化一个全局变量 pxDelayedTaskList，它指向当前正在使用的延时任务列表。
	pxDelayedTaskList = &xDelayedTaskList1;

    //初始化一个全局变量 pxOverflowDelayedTaskList，它指向当前正在使用的延时任务列表的溢出部分。
	pxOverflowDelayedTaskList = &xDelayedTaskList2;
}
```

链表的初始化由vListInitialise完成，vListInitialise函数原型为：
```
void vListInitialise( List_t * const pxList )
{
    //将列表的头指针和尾指针都指向列表的末尾，即xListEnd
	pxList->pxIndex = ( ListItem_t * ) &( pxList->xListEnd );

    //将列表的末尾的xItemValue设置为portMAX_DELAY
	pxList->xListEnd.xItemValue = portMAX_DELAY;

    //将列表的末尾的pxNext和pxPrevious都指向列表的末尾，即xListEnd
	pxList->xListEnd.pxNext = ( ListItem_t * ) &( pxList->xListEnd );	
	pxList->xListEnd.pxPrevious = ( ListItem_t * ) &( pxList->xListEnd );

    //将列表的长度设置为0
	pxList->uxNumberOfItems = ( UBaseType_t ) 0U;

    //将列表的头指针和尾指针都指向列表的末尾，即xListEnd
	listSET_LIST_INTEGRITY_CHECK_1_VALUE( pxList );
	listSET_LIST_INTEGRITY_CHECK_2_VALUE( pxList );
}
```

做了下面这几个事儿：
- 首先将链表的轮询指针指向最小的值，也就是链表的末尾
- 然后将链表链尾的链表项值设置为最大值，确保排序的时候在最后
- 把链表的头和尾指针都指向链尾
- 把链表的长度设置为0
