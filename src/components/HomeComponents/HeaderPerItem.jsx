import React from 'react'
import HoverCardUse from '../HoverCardUse'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

export default function HeaderPerItem({title , desc , textLink , to}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-foreground">
            {title}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
           {desc}
          </p>
        </div>
        <HoverCardUse
          Render={
            <Link  to ={to}className="inline-flex items-center text-slate-900 font-semibold hover:text-slate-600 transition-colors text-lg group">
              {textLink}
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          }
          RenderText={textLink || ""}
        />
      </div>
  )
}
