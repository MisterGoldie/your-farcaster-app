import { NextRequest, NextResponse } from 'next/server';
import { getFarcasterAddressesFromFID, getVestingContractAddress, getOwnedFanTokens, checkFanTokenOwnership, getUserRecord, getTotalGamesPlayed, getUserProfilePicture, getUsername } from '../../../utils/farcasterUtils';

function calculatePODScore(wins: number, ties: number, losses: number, totalGames: number, tokenBalance: number): number {
  const baseScore = (wins * 2) + ties + (losses * 0.5);
  const gamesBonusScore = totalGames >= 25 ? 10 : 0;
  const tokenBonusScore = Math.floor(tokenBalance) * 25; // 25 points for each whole token
  const totalScore = baseScore + gamesBonusScore + tokenBonusScore;
  return Math.round(totalScore * 10) / 10; // Round to one decimal place.
}

export async function GET(req: NextRequest) {
  const fid = req.nextUrl.searchParams.get('fid');

  if (!fid) {
    return NextResponse.json({ error: 'FID is required' }, { status: 400 });
  }

  try {
    const fanTokenResult = await checkFanTokenOwnership(fid);
    const userRecord = await getUserRecord(fid);
    const totalGamesPlayed = await getTotalGamesPlayed(fid);
    const profileImage = await getUserProfilePicture(fid);
    const username = await getUsername(fid);

    const podScore = calculatePODScore(
      userRecord.wins,
      userRecord.ties,
      userRecord.losses,
      totalGamesPlayed,
      fanTokenResult.balance
    );

    const response = NextResponse.json({
      name: username,
      profileImage,
      podScore,
      record: userRecord,
      totalGamesPlayed,
      thepodTokens: fanTokenResult.balance
    });

    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live blob:; worker-src blob:; connect-src 'self' https://api.airstack.xyz; img-src 'self' data: https:;"
    );

    return response;
  } catch (error) {
    console.error('Error fetching player data:', error);
    return NextResponse.json({ error: 'Failed to fetch player data' }, { status: 500 });
  }
}
