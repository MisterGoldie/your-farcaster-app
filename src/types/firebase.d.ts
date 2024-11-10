import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

declare module 'firebase/app' {
  export default firebase;
}

declare module 'firebase/auth' {
  export * from '@firebase/auth'
}

declare module 'firebase/firestore' {
  export * from '@firebase/firestore'
}

declare module 'firebase/storage' {
  export * from '@firebase/storage'
}
