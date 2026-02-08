import React from 'react'
import { useAuth } from '../../ZustandStore/AuthStore'
import type { LoadingProp } from '../../Types';

function Loading(classname : LoadingProp) {
  const isLoading = useAuth(s => s.isLoading);
  if(!isLoading) return;
  return (
    <div className={`fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center ${classname} justify-center`}>

      <div
        className="
        h-12 w-12
        border-4 border-blue-200
        border-t-blue-700
        rounded-full
        animate-spin
        "
      />

    </div>
  )
}

export default Loading