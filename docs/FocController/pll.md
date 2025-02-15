---
id: pll
title: PLL 锁相环
sidebar_label: Phase Locked Loop
---

## 简介
锁相环是一种反馈控制电路。是利用外部输入的参考信号控制环路内部震荡信号的频率和相位。

因为锁相环可以让输出信号频率对输入信号频率跟踪，所以PLL常用于闭环跟踪电路。

在工作过程中，当输出信号的频率和输入信号的频率相等时，输出电压与输入电压保持固定的相位差，也就是输入和输出的相位被锁住。

## 组成部分
基本锁相环由三部分构成：
- 鉴相器(PD,Phase Detector)
- 环路滤波器(LF,Loop Filter)
- 压控振荡器(VCO,Voltage Controlled Oscillator)

## 工作原理
1. 鉴相器

