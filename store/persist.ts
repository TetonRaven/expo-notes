import { observable } from "@legendapp/state";
import { syncObservable } from '@legendapp/state/sync';
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

import { store$ } from '@/store/legendState';

// Persist the observable to the named key of the global persist plugin
export function sync() {
    syncObservable(store$, {
        persist: {
            name: 'notesStorage',
            plugin: ObservablePersistMMKV
        }
    });
} 