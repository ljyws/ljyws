---
id: irq
title: Linux 中断
sidebar_label: Linux IRQ
---

## Linux中的中断API函数

### 一、中断号
在linux中，使用一个int变量表示中断号其中有：
- 私有外设中断(PPI):中断号为16-31
- 共享外设中断(SPI):中断号为32-1020，对于imx6ull，实际支持的SPI中断号有128个，也就是ID为32-159
- 软件中断(SGI):通常为0-15

### 二、request_irq函数
在liunx中，要使用某个中断是需要申请的，使用request_irq函数用于申请中断，但是这个函数可能会导致睡眠，因此不能在中断上下文或者其他禁止睡眠的位置使用request_irq函数，函数原型：
```
int request_irq(unsigned int irq,     
                irq_handler_t handler,
                unsigned long  flags,  
                const char *name,
                void    *dev) 
```

其中：
- irq:要申请的中断号
- handler:中断处理函数
- flags:中断标志，都定义在include/linux/interrupt.h里，一些常用的有：  

| FLAG | 描述 |
| :----- | :----- | 
| IRQF_SHARE | 多个设备共享一个中断号的时候，共享的所有中断都指定这个中断标志，并使用request_irq里的dev参数来区分
| IRQF_ONESHOT| 单次中断，只执行一次 |
| IRQF_TRIGGER_NON | 无触发 |
| IRQF_TRIGGER_RISING | 上升沿触发 |
| IRQF_TRIGGER_FALLING | 下降沿触发 |
| IRQF_TRIGGER_HIGH  | 高电平触发 |
| IRQF_TRIGGER_LOW  | 低电平触发 |

- name:中断名字，设置后可以在/proc/interrupts文件里看到
- dev:为设备结构体，会传递到irq_handler_t的第二个参数

### 三、free_irq函数
使用中断时候request，同理使用完后，就要free掉，函数原型：
```
void free_irq(unsigned int irq, void *dev)
```

其中：
- irq:要释放的中断
- dev：设备

### 四、中断处理函数
在使用request_irq的时候，有一个参数是中断处理函数，格式如下：
` irqreturn_t (*irq_handler_t)(int, void*) `
其中，第一个参数是中断号，第二个函数是通用指针，通常和request_irq函数中的dev参数保持一致，返回类型是irqreturn_t，这是一个枚举类型，如下：
```
enum irqreturn {
    IRQ_NONE = (0 << 0),
    IRQ_HANDLED = (1 << 0),
    IRQ_WAKE_THREAD = (1 << 1),
};
```

### 五、中断使能与禁止
#### 使能
` void enable_irq(unsigned int irq) `

#### 禁止
` void disable_irq(unsigned int ir) `  

其中，禁止函数要等到当前在执行的中断处理函数执行完才返回，因此要保证不会产生新的中断，并确保所有已经开始执行的中断处理函数全部退出，在这种情况下有另一种禁止函数：
` void disable_irq_nosync(unsigned int irq) `

若需要关闭或者使能全部的中断系统，则使用：  

` local_irq_enable() `  

` local_irq_disable() `

但此时有一种情况：如果A任务用local_irq_disable关闭了全局中断10s,当运行第二秒的时候，B任务也用了下local_irq_disable，关闭全局中断3s,3秒以后B任务又使用了local_irq_enable函数打开全局中断，此使刚过去5秒，但是中断被打开了，所以为了避免这种情况，B任务不能粗暴的直接local_irq_enable，而是应该将中断状态恢复到之前的状态，这时候就要用：

` local_irq_save(flags) `  

` local_irq_restore(flags) `

## 上半部与下半部
对于中断处理函数来说，我们尽可能要运行时间短，不在中断中处理过多的任务，然而可能在实际使用时，无法避免这些问题，因此引入了一个上半部和下半部的概念。
在上半部处理一些简单、时间短的任务，比如初始化啊之类的，把耗时间的任务放到下半部就处理。
操作系统在执行处理函数时，会执行完上半部后，就返回，然后系统在调度中在去执行下半部的部分。

### 上半部
写在中断处理函数里的任务就是上半部

### 下半部
实现下半部的方法有以下：
- softirq :软中断
- tasklet :是将下半部通过一个结构体去管理，然后将该结构体放入内核提供的一个链表中，系统去调度，tasklet中的方法不能休眠，运行在中断上下文
- workqueue : 是将下半部通过一个结构体去管理，然后将结构体放入到内核提供的一个队列中，系统去调度，同时workqueue其中的方法可以休眠，运行在线程上下文

#### 
