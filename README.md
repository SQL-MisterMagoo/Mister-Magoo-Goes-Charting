# Blazor Charts

Chart components for Blazor

This is a work in progress, not production ready.

Note: The branch "music" contains a page called BlazorAmp.razor which plays music and hooks it up to the bar chart like an EQ visualiser. The music referenced in the code is not included on GitHub, so you will need to either download the tracks from https://www.bensound.com OR replace with your own tracks.
# Vertical Bar Chart

There is only one chart in the project at the moment, a vertical bar chart.

It doesn't have bells and whistles - or very much of anything.

**usage:**

See the BlazorBarChartMM project for examples (very ugly - don't complain)

*Basic usage:*

```
<BarChartVertical Data="@listOfValues"
	BarStyle="@BlazorBarStyle.Normal"
	ChartHeight="250" />
```

For now, you will have to dig into the code to figure out all the options - I will document later.


