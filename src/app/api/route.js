import { NextResponse } from 'next/server';
import { Config } from 'sst/node/config'

import { dbNow, addLead } from '@/app/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET(request){
  const { SECRET_VAL, STAGE, DATABASE_URL } = Config;
  const dbResult = await dbNow();
  const leadResult = await addLead( {email: 'abc123@abc123.com'})
  const now = dbResult ? dbResult[0].now : null;
  return NextResponse.json({ 
    hello: "World", 
    secretVal: SECRET_VAL,
    leadResult: leadResult, 
    stage: STAGE, 
    dbString: `${DATABASE_URL}`.slice(0, 25),
    now: now
  }, {status: 200})
}
