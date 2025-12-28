
function calculateMA(data, period) {
    const result = []
    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) continue // skip until we have enough candles
        const slice = data.slice(i - period + 1, i + 1)
        const avg = slice.reduce((sum, bar) => sum + bar.close, 0) / period
        result.push({ time: data[i].time, value: avg })
    }
    return result
}


export default {calculateMA}