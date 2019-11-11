// assert（断言）
//
// assert.AssertionError 类
//
// new assert.AssertionError(options)
// 严格模式
// 遗留模式
// assert(value[, message])
// assert.deepEqual(actual, expected[, message])
//
// 比较运算的详细说明
// assert.deepStrictEqual(actual, expected[, message])
//
// 比较运算的详细说明
// assert.doesNotReject(asyncFn[, error][, message])
// assert.doesNotThrow(fn[, error][, message])
// assert.equal(actual, expected[, message])
// assert.fail([message])
// assert.fail(actual, expected[, message[, operator[, stackStartFn]]])
// assert.ifError(value)
// assert.notDeepEqual(actual, expected[, message])
// assert.notDeepStrictEqual(actual, expected[, message])
// assert.notEqual(actual, expected[, message])
// assert.notStrictEqual(actual, expected[, message])
// assert.ok(value[, message])
// assert.rejects(asyncFn[, error][, message])
// assert.strictEqual(actual, expected[, message])
// assert.throws(fn[, error][, message])



// new assert.AssertionError(options)
// options <Object>
// message <string> 如果提供，则将错误消息设置为此值。
// actual <any> 错误实例上的 actual 属性将包含此值。
// expected <any> 错误实例上的 expected 属性将包含此值。
// operator <string> 错误实例上的 operator 属性将包含此值。
// stackStartFn <Function> 如果提供，则生成的堆栈跟踪将移除所有帧直到提供的函数。
// Error 的子类，表明断言的失败。
//
// 所有实例都包含内置的 Error 属性（message 和 name）以及：
//
// actual <any> 设置方法的 actual 参数，例如 assert.strictEqual()。
// expected <any> 设置方法的 expected 参数，例如 assert.strictEqual()。
// generatedMessage <boolean> 表明消息是否是自动生成的。
// code <string> 始终设置为字符串 ERR_ASSERTION 以表明错误实际上是断言错误。
// operator <string> 设置为传入的运算符值。

const assert = require('assert')

// 生成 AssertionError 以便稍后比较错误的消息：
const { message } = new assert.AssertionError({
    actual: 1,
    expected: 2,
    operator: 'strictEqual'
});

// 验证错误的输出：
try {
    assert.strictEqual(1, 2);
} catch (err) {
    assert(err instanceof assert.AssertionError);
    assert.strictEqual(err.message, message);
    assert.strictEqual(err.name, 'AssertionError');
    assert.strictEqual(err.actual, 1);
    assert.strictEqual(err.expected, 2);
    assert.strictEqual(err.code, 'ERR_ASSERTION');
    assert.strictEqual(err.operator, 'strictEqual');
    assert.strictEqual(err.generatedMessage, true);
}
