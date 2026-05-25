// Lesson 03 — Stack: lời giải bằng Go.
// Chạy: go run solutions.go
package main

import (
	"fmt"
	"strconv"
	"strings"
)

// Bài 1 — kiểm tra ngoặc cân bằng.
func isBalanced(s string) bool {
	pairs := map[rune]rune{')': '(', ']': '[', '}': '{'}
	stack := []rune{}
	for _, c := range s {
		switch c {
		case '(', '[', '{':
			stack = append(stack, c)
		case ')', ']', '}':
			if len(stack) == 0 || stack[len(stack)-1] != pairs[c] {
				return false
			}
			stack = stack[:len(stack)-1]
		}
	}
	return len(stack) == 0
}

// Bài 2 — MinStack với getMin O(1).
type MinStack struct {
	data, mins []int
}

func (s *MinStack) Push(x int) {
	s.data = append(s.data, x)
	m := x
	if len(s.mins) > 0 && s.mins[len(s.mins)-1] < x {
		m = s.mins[len(s.mins)-1]
	}
	s.mins = append(s.mins, m)
}
func (s *MinStack) Pop() int {
	n := len(s.data) - 1
	x := s.data[n]
	s.data = s.data[:n]
	s.mins = s.mins[:n]
	return x
}
func (s *MinStack) GetMin() int { return s.mins[len(s.mins)-1] }

// Bài 3 — tính biểu thức postfix (RPN).
func evalPostfix(expr string) int {
	stack := []int{}
	for _, tok := range strings.Fields(expr) {
		switch tok {
		case "+", "-", "*", "/":
			b := stack[len(stack)-1]
			a := stack[len(stack)-2]
			stack = stack[:len(stack)-2]
			var r int
			switch tok {
			case "+":
				r = a + b
			case "-":
				r = a - b
			case "*":
				r = a * b
			case "/":
				r = a / b
			}
			stack = append(stack, r)
		default:
			n, _ := strconv.Atoi(tok)
			stack = append(stack, n)
		}
	}
	return stack[0]
}

// Bài 4 — Shunting-yard: infix -> postfix (đơn giản, ký tự đơn).
func infixToPostfix(s string) string {
	prec := map[rune]int{'+': 1, '-': 1, '*': 2, '/': 2}
	out := []rune{}
	op := []rune{}
	for _, c := range s {
		switch {
		case c >= 'a' && c <= 'z', c >= '0' && c <= '9':
			out = append(out, c, ' ')
		case c == '(':
			op = append(op, c)
		case c == ')':
			for len(op) > 0 && op[len(op)-1] != '(' {
				out = append(out, op[len(op)-1], ' ')
				op = op[:len(op)-1]
			}
			op = op[:len(op)-1] // bỏ '('
		case c == '+' || c == '-' || c == '*' || c == '/':
			for len(op) > 0 && op[len(op)-1] != '(' && prec[op[len(op)-1]] >= prec[c] {
				out = append(out, op[len(op)-1], ' ')
				op = op[:len(op)-1]
			}
			op = append(op, c)
		}
	}
	for len(op) > 0 {
		out = append(out, op[len(op)-1], ' ')
		op = op[:len(op)-1]
	}
	return strings.TrimSpace(string(out))
}

func main() {
	fmt.Println("Bài 1:", isBalanced("({[]})"), isBalanced("(]"), isBalanced("((()))"))

	ms := &MinStack{}
	ms.Push(3)
	ms.Push(5)
	ms.Push(2)
	ms.Push(7)
	fmt.Println("Bài 2 — getMin:", ms.GetMin()) // 2
	ms.Pop()
	ms.Pop()
	fmt.Println("Bài 2 — getMin sau pop:", ms.GetMin()) // 3

	fmt.Println("Bài 3 — '2 3 + 4 *' =", evalPostfix("2 3 + 4 *")) // 20
	fmt.Println("Bài 3 — '5 1 2 + 4 * + 3 -' =", evalPostfix("5 1 2 + 4 * + 3 -")) // 14

	fmt.Println("Bài 4 — (a+b)*c ->", infixToPostfix("(a+b)*c"))             // a b + c *
	fmt.Println("Bài 4 — a+b*c-d ->", infixToPostfix("a+b*c-d"))             // a b c * + d -
}
