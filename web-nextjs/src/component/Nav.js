import React from 'react';
import Image from 'next/image';
import logo from '../../public/courtAlami1.jpeg';
import { UpdatedTime } from '@/lib/utils';
import Link from 'next/link';

export default async function Nav() {

    const updatedTime = await UpdatedTime();

    const isLogin = true;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Link href="/">
                    <Image src={logo} alt="logo" width="50" height="50" />
                </Link>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                {updatedTime}
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                {isLogin === true
                    ?
                    (<div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <div>
                            <Link href="/login">LOGIN</Link>
                        </div>
                        <div>
                            <Link href="/signin">SIGNIN</Link>
                        </div>
                    </div>)
                    :
                    (<div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <div>
                            <Link href="/">LOGOUT</Link>
                        </div>
                        <div>
                            <Link href="/mypage">MyPage</Link>
                        </div>
                    </div>)
                }
            </div>

        </div>
    )
}
