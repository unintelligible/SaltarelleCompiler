﻿using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

namespace System.Collections.Generic
{
	[Imported(IsRealType = true)]
	[IgnoreGenericArguments]
	[ScriptNamespace("ss")]
	internal class IteratorBlockEnumerable<T> : IEnumerable<T> {
		public IEnumerator<T> GetEnumerator() { return null; }
		IEnumerator IEnumerable.GetEnumerator() { return null; }
	}
}
