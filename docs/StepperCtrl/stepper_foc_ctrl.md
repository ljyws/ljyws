---
id: simulation
title: Stepper FOC Controller Simulation
sidebar_label: Simulation
---

回顾：
在无刷电机的FOC控制里，其核心思想是"解耦"，利用数学中的坐标变换，将三相坐标系下电机电流转换到交轴Iq与直轴Id,再通过设计控制器如PID,ADRC等方法对电机完成控制。而步进电机，其本质也可以理解为一种两相的无刷电机，因此，可以借鉴三相无刷电机的FOC控制，实现步进电机的精准控制。
## 步进电机模型

对于常见的步进电机控制方法，也就是脉冲控制，指的是输入一个脉冲，电机转子就步进一下，所以在这种控制方法下，输出的角度和脉冲数有关，成正比，而转速则和脉冲的频率有关。对于此次使用的两相四线步进电机，有四根线，电机可以简化成一下模型：
![image](img/1.png)

通俗来理解，就是当电流从A+流入，A-流出时，产生了一个N-S磁极，吸引中间的转子转动，接着换B+流入B-流出，产生另一对磁极，不断吸引转子转动。而在此过程中，衍生出很多控制方式，对于现在成本较高的，也就是混合式步进电机，大概是这样：  
![alt text](img/2.png)

转子是带齿冠的，因此分辨率更高，通常都是1.8°的步距角，也就是转一圈200个脉冲。我们要控制的也是这种电机。

## foc控制

### clark变换
经过BLDC的FOC控制，可以知道核心的一部分就是通过坐标变换，也就是先使用clark变换将三个相位相差120°的正弦信号转换到α-β两相坐标系下，这一步也很简单，就是：
$$
\left \{\begin{aligned}I_{\beta} &= \sin\frac{2\pi}{3} I_{b} - \sin\frac{2\pi}{3} I_{c} \\I_{\alpha} &= I_{a} + \cos\frac{2\pi}{3} I_{b} + \cos\frac{2\pi}{3} I_{c}\end{aligned}\right.
$$

而我们的步进本身就是两相直角坐标系，因此，反而是省去了clark变换这一步。

### park变换
对于park变化，和bldc时一致，也就是把两相静止的α-β坐标转换到随转子θ旋转的qd轴上，也是比较简单的数学变换：
$$
\left \{\begin{aligned}I_{d} &= \cos(\theta) I_{\alpha } + \sin(\theta) I_{\beta} \\I_{\alpha} &= -\sin(\theta) I_{\alpha } + \cos(\theta) I_{\beta}\end{aligned}\right.
$$

### SVPWM
除了基础的数学变换，另一个关键的部分就是SVPWM的计算过程，这一块需要和BLDC的SVPWM计算过程调整一下。