// KeyValuePair.cs
// Script#/Libraries/CoreLib
// This source code is subject to terms and conditions of the Apache License, Version 2.0.
//

using System.Runtime.CompilerServices;

namespace System.Collections.Generic {
	[IgnoreGenericArguments]
	[Serializable]
    public sealed class KeyValuePair<TKey, TValue> {

        public KeyValuePair() {
        }

		public KeyValuePair(TKey key, TValue value) {
		} 

        [ScriptName("Key")]
        public TKey Key {
            get {
                return default(TKey);
            }
        }
        [ScriptName("Value")]
        public TValue Value {
            get {
                return default(TValue);
            }
        }
    }
}
