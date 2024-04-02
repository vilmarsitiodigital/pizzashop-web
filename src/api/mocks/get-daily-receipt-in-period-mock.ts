import { http, HttpResponse } from 'msw'

import { GetDailyReceiptInPeriodResponse } from '../get-daily-receipt-in-period'

export const getDailyReceiptInPeriodMock = http.get<
  never,
  never,
  GetDailyReceiptInPeriodResponse
>('/metrics/daily-receipt-in-period', async () => {
  return HttpResponse.json([
    {
      date: '04/02',
      receipt: 2315,
    },
    {
      date: '05/02',
      receipt: 1458,
    },
    {
      date: '06/02',
      receipt: 4956,
    },
    {
      date: '07/02',
      receipt: 3362,
    },
  ])
})
