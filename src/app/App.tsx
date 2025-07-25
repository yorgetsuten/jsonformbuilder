import type { FormConfig } from './model/schema'

import clsx from 'clsx'
import styles from './app.module.css'
import { useState } from 'react'
import { Config } from './ui/Config'
import { Result } from './ui/Result'

export type Tabs = 'config' | 'result'

export function App() {
  const [activeTab, setActiveTab] = useState<Tabs>('config')
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null)

  function setConfigTab() {
    setActiveTab('config')
  }

  function setResultTab() {
    setActiveTab('result')
  }

  return (
    <div className={styles['app-container']}>
      <div className={styles['tabs-container']}>
        <div className={styles['set-tab-container']}>
          <button
            onClick={setConfigTab}
            className={clsx(activeTab === 'config' && styles['active'])}
          >
            Config
          </button>
          <button
            onClick={setResultTab}
            className={clsx(activeTab === 'result' && styles['active'])}
          >
            Result
          </button>
        </div>

        {activeTab === 'config' ? (
          <Config
            setActiveTab={setActiveTab}
            setFormConfig={setFormConfig}
            containerClassName={styles['tab-container']}
          />
        ) : (
          <Result
            config={formConfig}
            containerClassName={styles['tab-container']}
          />
        )}
      </div>
    </div>
  )
}
