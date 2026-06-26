export const runtime = 'nodejs'
export const maxDuration = 300

export async function GET(request: Request) {
  const auth = request.headers.get('authorization')
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { runPipeline } = await import('../../../../scripts/fetch-rss.mjs')
    await runPipeline()
    return Response.json({ ok: true })
  } catch (err) {
    console.error('RSS cron error:', err)
    return Response.json({ error: String(err) }, { status: 500 })
  }
}
