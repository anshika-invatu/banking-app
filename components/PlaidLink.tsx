import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import {PlaidLinkOptions, PlaidLinkOnSuccess, usePlaidLink} from 'react-plaid-link'


const PlaidLink = ({user, variant}:PlaidLinkProps) => {
  const router = useRouter()
  const [token, setToken] = useState('')
  
  useEffect(()=>{
    const getLinkToken = async()=>{
      const data= await createLinkToken(user);
      setToken(data?.linkToken);
    }
    getLinkToken()
  },[user])
 
  const onSuccess = useCallback<PlaidLinkOnSuccess>(async(public_token:string)=>{
    await exchangePublicToken({
      publicToken:public_token,
      user
    })

    router.push('/')
  },[router, user])
  
  const config:PlaidLinkOptions = {
    token,
    onSuccess
  }

  const {open, ready} = usePlaidLink(config)

  return (
    <>
        {variant==='primary'?(
            <button 
            onClick={()=>open()}
            disabled={!ready}
             className="plaidlink-primary">Connect bank</button>
        ): variant==='ghost'?(
            <button className="">Connect bank</button>
        ):(
            <button className="">Connect bank</button>
        )}
    </>
  )
}

export default PlaidLink