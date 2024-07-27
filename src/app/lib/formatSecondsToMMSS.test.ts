import { formatSecondsToMMSS } from "./formatSecondsToMMSS";

describe('функция форматирования времени', () => {


    it('Проверка правильности форматирования числа в строку', () => {
        const result = formatSecondsToMMSS(6)
        expect(result).toBe("00:06")
    })
    it('Проверка правильности форматирования ноль в строку', () => {
        const result = formatSecondsToMMSS(0)
        expect(result).toBe("00:00")
    })

})

