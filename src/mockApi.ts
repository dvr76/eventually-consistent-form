function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockApi(): Promise<{ ok: boolean }> {
  const randomValue = Math.random();

  if (randomValue < 0.33) {
    await delay(500);
    return { ok: true };
  }

  if (randomValue < 0.66) {
    await delay(500);
    throw new Error("503 Service Unavailable");
  }

  const wait = 5000 + Math.random() * 5000;

  await delay(wait);
  return { ok: true };
}
