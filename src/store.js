// src/stores/content.js
import { writable } from 'svelte/store'

let	storedConfig = []

storedConfig = JSON.parse( localStorage.getItem('config') )

export const config = writable( storedConfig || {} )

config.subscribe( (value) => localStorage.setItem('config', JSON.stringify(value) ) )
