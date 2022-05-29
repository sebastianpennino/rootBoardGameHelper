import React, { useContext } from 'react'
import RBGHContext from '../RBGHContext'
import { MethodOption } from '../types'
import { MethodItem } from './MethodItem'

export const MethodSelection = () => {
  const { methodList, setMethodList } = useContext<any>(RBGHContext)

  const selectMethod = (id: number) => {
    setMethodList((oldState: MethodOption[]) => {
      return oldState.map((oldMethod: MethodOption) => {
        return {
          ...oldMethod,
          selected: id === oldMethod.id,
        }
      })
    })
  }

  return (
    <ol className="method-list">
      {methodList.map((method: MethodOption, idx: number) => (
        <MethodItem idx={idx} key={method.id} method={method} selectMethod={selectMethod} />
      ))}
    </ol>
  )
}
