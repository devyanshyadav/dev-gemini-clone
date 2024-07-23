'use client'
import { NodeViewWrapper } from '@tiptap/react'
import React from 'react'
import root from "react-shadow/styled-components";
import { FormatOutput } from '@/utils/shadow';


export default (props:any) => {
  return (
    <NodeViewWrapper className="react-component">
      <label>React Component</label>
      <root.div className='content'>
                <FormatOutput>
                    {props.node.attrs.count}
                </FormatOutput>
            </root.div>
    
    </NodeViewWrapper>
  )
}