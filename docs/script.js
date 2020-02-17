const data = [5, 6, 2, 8, 4, 15, 1]

d3
.select('body')
.data(data)
.enter()
.append('div')
.text(d => d)
.style('padding', '1em')
.style('background-color', 'red')
.style('margin', '1px')
.style('width', d => `${d / Math.max(...data) * 100}%`)
.style('box-sizing', 'border-box')
