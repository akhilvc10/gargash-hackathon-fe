"use client"

import * as React from "react"
import {
  Line,
  Bar,
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  type TooltipProps,
} from "recharts"
import { cn } from "@/lib/utils"

interface ChartProps {
  data: any[]
  categories: string[]
  index: string
  colors?: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showGrid?: boolean
}

const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & ChartProps>(
  (
    {
      data,
      categories,
      index,
      colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"],
      valueFormatter = (value: number) => value.toString(),
      yAxisWidth = 40,
      showLegend = true,
      showXAxis = true,
      showYAxis = true,
      showGrid = true,
      className,
      ...props
    },
    ref,
  ) => {
    const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
      if (active && payload && payload.length) {
        return (
          <div className="rounded-lg border bg-background p-2 shadow-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">{index}</span>
                <span className="font-bold text-muted-foreground">{label}</span>
              </div>
              {payload.map((data, i) => (
                <div key={i} className="flex flex-col text-right">
                  <span className="text-[0.70rem] uppercase text-muted-foreground" style={{ color: data.color }}>
                    {data.name}
                  </span>
                  <span className="font-bold" style={{ color: data.color }}>
                    {valueFormatter(data.value as number)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      }

      return null
    }

    return (
      <div ref={ref} className={cn("w-full h-full", className)} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />}
            {showXAxis && (
              <XAxis
                dataKey={index}
                className="text-sm text-muted-foreground"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  // Format date to show only month and day
                  if (value.includes("-")) {
                    const date = new Date(value)
                    return `${date.getMonth() + 1}/${date.getDate()}`
                  }
                  return value
                }}
              />
            )}
            {showYAxis && (
              <YAxis
                width={yAxisWidth}
                className="text-sm text-muted-foreground"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => valueFormatter(value)}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            {showLegend && (
              <Legend
                className="text-xs text-muted-foreground"
                formatter={(value) => <span className="text-muted-foreground">{value}</span>}
              />
            )}
            {categories.map((category, i) => (
              <Line
                key={category}
                type="monotone"
                dataKey={category}
                stroke={colors[i % colors.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, className: "fill-primary" }}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    )
  },
)
Chart.displayName = "Chart"

const LineChart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & ChartProps>((props, ref) => (
  <Chart ref={ref} {...props} />
))
LineChart.displayName = "LineChart"

const BarChart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & ChartProps>(
  (
    {
      data,
      categories,
      index,
      colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"],
      valueFormatter = (value: number) => value.toString(),
      yAxisWidth = 40,
      showLegend = true,
      showXAxis = true,
      showYAxis = true,
      showGrid = true,
      className,
      ...props
    },
    ref,
  ) => {
    const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
      if (active && payload && payload.length) {
        return (
          <div className="rounded-lg border bg-background p-2 shadow-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">{index}</span>
                <span className="font-bold text-muted-foreground">{label}</span>
              </div>
              {payload.map((data, i) => (
                <div key={i} className="flex flex-col text-right">
                  <span className="text-[0.70rem] uppercase text-muted-foreground" style={{ color: data.color }}>
                    {data.name}
                  </span>
                  <span className="font-bold" style={{ color: data.color }}>
                    {valueFormatter(data.value as number)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      }

      return null
    }

    return (
      <div ref={ref} className={cn("w-full h-full", className)} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />}
            {showXAxis && (
              <XAxis dataKey={index} className="text-sm text-muted-foreground" tickLine={false} axisLine={false} />
            )}
            {showYAxis && (
              <YAxis
                width={yAxisWidth}
                className="text-sm text-muted-foreground"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => valueFormatter(value)}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            {showLegend && (
              <Legend
                className="text-xs text-muted-foreground"
                formatter={(value) => <span className="text-muted-foreground">{value}</span>}
              />
            )}
            {categories.map((category, i) => (
              <Bar key={category} dataKey={category} fill={colors[i % colors.length]} radius={[4, 4, 0, 0]} />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    )
  },
)
BarChart.displayName = "BarChart"

export { Chart, LineChart, BarChart }
