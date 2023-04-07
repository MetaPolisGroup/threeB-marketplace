import { Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import css from './index.module.css'
const Profile = () => {
    return (
        <div className={css['wrapper-profile']}>
            <div style={{ position: 'relative' }}>
                <div className={css["image-cover"]} />
                <div className={css['wrapper-avatar']}>
                    <div className={css['avatar']} />
                    <h2>Rayhan Khan Shovo</h2>
                    <Box width={["100%", "30%", "50%", "60%"]}>
                        <Text noOfLines={5}>
                            Autoglyphs are fitting the first “on-chain” to the find generative
                            art on the Ethereum blockchain
                            <Link href='/' >
                                <a style={{ marginLeft: 5, fontSize: 16, fontWeight: 400, color: '#5356FB' }}>Read More</a>
                            </Link>
                        </Text>
                    </Box>
                </div>
                <div className={css['btn-right']}>
                    <Link href='/'>
                        <a>Edit Profile</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Profile