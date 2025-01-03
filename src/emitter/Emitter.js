import { AST, ASTTypes } from "../parser/ast.js";
import { SyntaxException } from "../shared/exceptions.js";

export class Emitter {
  /**
   * Constructs the emitter object
   * @param {AST} program
   */
  constructor(program) {
    this.program = program;
  }

  /**
   * Static constructor
   * @param {AST} program
   * @returns {Emitter}
   */
  static new(program) {
    return new Emitter(program);
  }

  /**
   * Emitter dispatcher method
   * @param {AST} node
   * @returns {string}
   */
  emit(node = this.program) {
    switch (node.type) {
      case ASTTypes.Program:
        return this.emitProgram(node);
      case ASTTypes.NumberLiteral:
        return this.emitNumber(node);
      default:
        throw new SyntaxException(node.type, node.srcloc);
    }
  }

  /**
   * Generates code from a Number AST node
   * @param {import("../parser/ast.js").NumberLiteral} node
   * @returns {string}
   */
  emitNumber(node) {
    return node.value;
  }

  /**
   * Generates code from a Program AST node
   * @param {import("../parser/ast.js").Program} node
   * @returns {string}
   */
  emitProgram(node) {
    let code = "";

    for (let n of node.body) {
      code += this.emit(n);
    }

    return code;
  }
}