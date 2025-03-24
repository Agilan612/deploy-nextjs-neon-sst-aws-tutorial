import { NextResponse } from 'next/server';
import { Config } from 'sst/node/config'

import { dbNow } from '@/app/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET(request){
  const { SECRET_VAL, STAGE, DATABASE_URL } = Config;
  const dbResult = await dbNow();
  const now = dbResult ? dbResult[0].now : null;
  return NextResponse.json({ 
    hello: "World", 
    secretVal: SECRET_VAL, 
    stage: STAGE, 
    dbString: `${DATABASE_URL}`.slice(0, 25),
    now: now
  }, {status: 200})
}
