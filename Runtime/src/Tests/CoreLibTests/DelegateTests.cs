﻿using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Testing;
using System.Text;

namespace CoreLibTests {
	[TestFixture]
	public class DelegateTests {
		[Test]
		public void TypePropertiesAreCorrect() {
			Assert.AreEqual(typeof(Delegate).FullName, "Function");
			Assert.IsTrue(typeof(Delegate).IsClass);
			Assert.AreEqual(typeof(Func<int, string>).FullName, "Function");
			Assert.IsTrue((object)(Action)(() => {}) is Delegate);
		}

		[Test(ExpectedAssertionCount = 0)]
		public void EmptyFieldCanBeInvoked() {
			((Action)Delegate.Empty)();
			// No exception is good enough
		}

		[PreserveName]
		private int testField = 12;

		[Test]
		public void CreatingAndInvokingADelegateWorks() {
			Func<int, int> d = x => testField + x;
			Assert.AreEqual(d(13), 25);
		}

		[Test]
		public void CreateWorks() {
			var d = (Func<int, int>)Delegate.Create(this, new Function("x", "{ return x + this.testField; }"));
			Assert.AreEqual(d(13), 25);
		}

		[Test]
		public void CombineWorks() {
			var sb = new StringBuilder();
			Action d = (Action)Delegate.Combine((Action)(() => sb.Append("1")), (Action)(() => sb.Append("2")));
			d();
			Assert.AreEqual(sb.ToString(), "12");
		}

		[Test]
		public void AddWorks() {
			var sb = new StringBuilder();
			Action d = (Action)(() => sb.Append("1")) + (Action)(() => sb.Append("2"));
			d();
			Assert.AreEqual(sb.ToString(), "12");
		}

		[Test]
		public void AddAssignWorks() {
			var sb = new StringBuilder();
			Action d = () => sb.Append("1");
			d += () => sb.Append("2");
			d();
			Assert.AreEqual(sb.ToString(), "12");
		}

		[Test]
		public void RemoveWorks() {
			var sb = new StringBuilder();
			Action d2 = () => sb.Append("2");
			Action d = (Action)Delegate.Combine(Delegate.Combine((Action)(() => sb.Append("1")), d2), (Action)(() => sb.Append("3")));
			var d3 = (Action)Delegate.Remove(d, d2);
			d3();
			Assert.AreEqual(sb.ToString(), "13");
		}

		[Test]
		public void SubtractWorks() {
			var sb = new StringBuilder();
			Action d2 = () => sb.Append("2");
			Action d = (Action)Delegate.Combine(Delegate.Combine((Action)(() => sb.Append("1")), d2), (Action)(() => sb.Append("3")));
			var d3 = d - d2;
			d3();
			Assert.AreEqual(sb.ToString(), "13");
		}

		[Test]
		public void SubtractAssignWorks() {
			var sb = new StringBuilder();
			Action d2 = () => sb.Append("2");
			Action d = (Action)Delegate.Combine(Delegate.Combine((Action)(() => sb.Append("1")), d2), (Action)(() => sb.Append("3")));
			d -= d2;
			d();
			Assert.AreEqual(sb.ToString(), "13");
		}

		[Test]
		public void CloneWorks() {
			var sb = new StringBuilder();
			Action d1 = () => { sb.Append("1"); };
			Action d2 = (Action)Delegate.Clone(d1);
			Assert.IsFalse(d1 == d2);
			d2();
			Assert.AreEqual(sb.ToString(), "1");
		}

		[InlineCode("{d}.apply({t}, {args})")]
		public object Call(object t, Delegate d, params object[] args) {
			return null;
		}

		[Test]
		public void ThisFixWorks() {
			var target = new { someField = 13 };
			var d = Delegate.ThisFix((Func<dynamic, int, int, int>)((t, a, b) => t.someField + this.testField + a + b));
			Assert.AreEqual(Call(target, d, 3, 5), 33);
		}
	}
}
