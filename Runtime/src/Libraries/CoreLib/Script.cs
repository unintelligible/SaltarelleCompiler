// Script.cs
// Script#/Libraries/CoreLib
// This source code is subject to terms and conditions of the Apache License, Version 2.0.
//

using System.Runtime.CompilerServices;

namespace System {

    /// <summary>
    /// The Script class contains various methods that represent global
    /// methods present in the underlying script engine.
    /// </summary>
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public static class Script {
        /// <summary>
        /// Converts an object into a boolean.
        /// </summary>
        /// <param name="o">The object to convert.</param>
        /// <returns>true if the object is not null, zero, empty string or undefined.</returns>
        [InlineCode("!!{o}")]
        public static bool Boolean(object o) {
            return false;
        }

        /// <summary>
        /// Enables you to evaluate (or execute) an arbitrary script
        /// literal. This includes JSON literals, where the return
        /// value is the deserialized object graph.
        /// </summary>
        /// <param name="s">The script to be evaluated.</param>
        /// <returns>The result of the evaluation.</returns>
        [ScriptAlias("eval")]
        public static object Eval(string s) {
            return null;
        }

        /// <summary>
        /// Checks if the specified object is null.
        /// </summary>
        /// <param name="o">The object to test against null.</param>
        /// <returns>true if the object is null; false otherwise.</returns>
        [ScriptAlias("ss.isNull")]
        public static bool IsNull(object o) {
            return false;
        }

        /// <summary>
        /// Checks if the specified object is null or undefined.
        /// The object passed in should be a local variable, and not
        /// a member of a class (to avoid potential script warnings).
        /// </summary>
        /// <param name="o">The object to test against null or undefined.</param>
        /// <returns>true if the object is null or undefined; false otherwise.</returns>
        [ScriptAlias("ss.isNullOrUndefined")]
        public static bool IsNullOrUndefined(object o) {
            return false;
        }

        /// <summary>
        /// Checks if the specified object is undefined.
        /// The object passed in should be a local variable, and not
        /// a member of a class (to avoid potential script warnings).
        /// </summary>
        /// <param name="o">The object to test against undefined.</param>
        /// <returns>true if the object is undefined; false otherwise.</returns>
        [ScriptAlias("ss.isUndefined")]
        public static bool IsUndefined(object o) {
            return false;
        }

        /// <summary>
        /// Checks if the specified object has a value, i.e. it is not
        /// null or undefined.
        /// </summary>
        /// <param name="o">The object to test.</param>
        /// <returns>true if the object represents a value; false otherwise.</returns>
        [ScriptAlias("ss.isValue")]
        public static bool IsValue(object o) {
            return false;
        }

        [Obsolete("The Script.Literal method is not supported. As a workaround, you can define another method and decorate it with an [InlineCodeAttribute]", true)]
        public static object Literal(string script, params object[] args) {
            return null;
        }

		/// <summary>
		/// Returns the undefined object.
		/// </summary>
		public static object Undefined {
			[InlineCode("undefined")] get { return null; }
		}

		/// <summary>
		/// Returns the Javascript 'this'. Might be useful sometimes, but there are usually better ways of doing whatever is being done.
		/// </summary>
		public static object This {
			[InlineCode("this")] get { return null; }
		}

		/// <summary>
		/// Reinterpret an object as another type without performing any type checks. 'Script.Reinterpret&lt;SomeType&gt;(a)' will always compile to 'a' regardless of types.
		/// </summary>
		[ScriptSkip]
		public static T Reinterpret<T>(object o) {
			return default(T);
		}
    }
}
