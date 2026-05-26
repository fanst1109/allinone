// Package main — Lesson 31: reflect — runtime introspection.
//
// Chạy: go run solutions.go
package main

import (
	"errors"
	"fmt"
	"reflect"
	"strings"
)

// --------------------------------------------------------------------------
// 1. TypeOf / ValueOf — quy luật 1: từ interface → reflect object.
// --------------------------------------------------------------------------

func demoTypeValueOf() {
	fmt.Println("== 1. TypeOf / ValueOf ==")
	var x float64 = 3.14
	t := reflect.TypeOf(x)
	v := reflect.ValueOf(x)
	fmt.Printf("  Type=%v, Kind=%v, Value=%v\n", t, v.Kind(), v.Float())

	// Quy luật 2: từ reflect object về lại interface.
	back := v.Interface().(float64)
	fmt.Printf("  Interface() unwrap -> %v\n", back)

	// Type khác Kind: MyInt cùng Kind=int nhưng Type khác.
	type MyInt int
	var m MyInt = 7
	tm := reflect.TypeOf(m)
	fmt.Printf("  MyInt Type=%v Name=%v Kind=%v\n", tm, tm.Name(), tm.Kind())
}

// --------------------------------------------------------------------------
// 2. Walk struct — đọc field, type, tag (đây là backbone của JSON encoder).
// --------------------------------------------------------------------------

type User struct {
	Name  string `json:"name"  validate:"required"`
	Email string `json:"email" validate:"required,email"`
	Age   int    `json:"age"   validate:"min=0"`
}

func walkStruct(x any) {
	fmt.Println("== 2. Walk struct ==")
	v := reflect.ValueOf(x)
	t := reflect.TypeOf(x)
	if t.Kind() != reflect.Struct {
		fmt.Println("  không phải struct")
		return
	}
	for i := 0; i < t.NumField(); i++ {
		f := t.Field(i)
		fmt.Printf("  %-6s %-8v %-15v json=%q validate=%q\n",
			f.Name, f.Type, v.Field(i).Interface(),
			f.Tag.Get("json"), f.Tag.Get("validate"))
	}
}

// --------------------------------------------------------------------------
// 3. Modify field qua pointer + Elem() + CanSet().
//    Demo quy luật 3: muốn Set, phải settable.
// --------------------------------------------------------------------------

func demoModify() {
	fmt.Println("== 3. Modify với Elem ==")
	u := User{Name: "Alice", Age: 30}

	// Truyền pointer + Elem để có addressable Value.
	p := reflect.ValueOf(&u).Elem()
	nameField := p.FieldByName("Name")
	if nameField.CanSet() {
		nameField.SetString("Bob")
	}
	ageField := p.FieldByName("Age")
	if ageField.CanSet() {
		ageField.SetInt(31)
	}
	fmt.Printf("  After modify: %+v\n", u)
}

// --------------------------------------------------------------------------
// 4. Dynamic function call — reflect.Value.Call.
//    Use case: RPC dispatcher, command router, mock framework.
// --------------------------------------------------------------------------

func demoDynamicCall() {
	fmt.Println("== 4. Dynamic call ==")
	add := func(a, b int) int { return a + b }
	concat := func(a, b string) string { return a + " " + b }

	call := func(fn any, args ...any) []reflect.Value {
		fv := reflect.ValueOf(fn)
		in := make([]reflect.Value, len(args))
		for i, a := range args {
			in[i] = reflect.ValueOf(a)
		}
		return fv.Call(in)
	}

	fmt.Println("  add(3,4) =", call(add, 3, 4)[0].Int())
	fmt.Println("  concat(\"hello\",\"world\") =", call(concat, "hello", "world")[0].String())
}

// --------------------------------------------------------------------------
// 5. Simple required-validator — đọc tag validate:"required".
//    Đây là phiên bản đơn giản của go-playground/validator.
// --------------------------------------------------------------------------

func Validate(x any) error {
	v := reflect.ValueOf(x)
	t := reflect.TypeOf(x)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
		t = t.Elem()
	}
	if v.Kind() != reflect.Struct {
		return errors.New("validate: not a struct")
	}
	for i := 0; i < t.NumField(); i++ {
		f := t.Field(i)
		rule := f.Tag.Get("validate")
		if !strings.Contains(rule, "required") {
			continue
		}
		if v.Field(i).IsZero() {
			return fmt.Errorf("%s is required", f.Name)
		}
	}
	return nil
}

func demoValidator() {
	fmt.Println("== 5. Validator ==")
	cases := []User{
		{Name: "Alice", Email: "a@x.io", Age: 30}, // pass
		{Name: "Bob"},                             // fail: Email required
		{Email: "c@x.io"},                         // fail: Name required
	}
	for _, u := range cases {
		if err := Validate(u); err != nil {
			fmt.Printf("  %+v -> ERROR: %v\n", u, err)
		} else {
			fmt.Printf("  %+v -> OK\n", u)
		}
	}
}

// --------------------------------------------------------------------------
// 6. StructToMap — bài tập 2.
// --------------------------------------------------------------------------

func StructToMap(x any) map[string]any {
	out := make(map[string]any)
	v := reflect.ValueOf(x)
	t := reflect.TypeOf(x)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
		t = t.Elem()
	}
	if v.Kind() != reflect.Struct {
		return out
	}
	for i := 0; i < t.NumField(); i++ {
		f := t.Field(i)
		if !f.IsExported() {
			continue
		}
		out[f.Name] = v.Field(i).Interface()
	}
	return out
}

// --------------------------------------------------------------------------
// 7. SetField — bài tập 3.
// --------------------------------------------------------------------------

func SetField(obj any, name string, value any) error {
	v := reflect.ValueOf(obj)
	if v.Kind() != reflect.Ptr || v.IsNil() {
		return errors.New("obj must be non-nil pointer")
	}
	v = v.Elem()
	if v.Kind() != reflect.Struct {
		return errors.New("obj must point to struct")
	}
	field := v.FieldByName(name)
	if !field.IsValid() {
		return fmt.Errorf("no field %q", name)
	}
	if !field.CanSet() {
		return fmt.Errorf("field %q cannot be set", name)
	}
	val := reflect.ValueOf(value)
	if field.Type() != val.Type() {
		return fmt.Errorf("type mismatch: field %s vs value %s", field.Type(), val.Type())
	}
	field.Set(val)
	return nil
}

// --------------------------------------------------------------------------
// 8. DeepEq — bài tập 4.
// --------------------------------------------------------------------------

func DeepEq(a, b any) bool {
	return deepEqValue(reflect.ValueOf(a), reflect.ValueOf(b))
}

func deepEqValue(a, b reflect.Value) bool {
	if !a.IsValid() || !b.IsValid() {
		return a.IsValid() == b.IsValid()
	}
	if a.Type() != b.Type() {
		return false
	}
	switch a.Kind() {
	case reflect.Struct:
		for i := 0; i < a.NumField(); i++ {
			if !deepEqValue(a.Field(i), b.Field(i)) {
				return false
			}
		}
		return true
	case reflect.Slice, reflect.Array:
		if a.Len() != b.Len() {
			return false
		}
		for i := 0; i < a.Len(); i++ {
			if !deepEqValue(a.Index(i), b.Index(i)) {
				return false
			}
		}
		return true
	case reflect.Map:
		if a.Len() != b.Len() {
			return false
		}
		for _, k := range a.MapKeys() {
			v2 := b.MapIndex(k)
			if !v2.IsValid() {
				return false
			}
			if !deepEqValue(a.MapIndex(k), v2) {
				return false
			}
		}
		return true
	default:
		return a.Interface() == b.Interface()
	}
}

// --------------------------------------------------------------------------
// main — chạy hết các demo và bài tập.
// --------------------------------------------------------------------------

func main() {
	demoTypeValueOf()
	fmt.Println()

	u := User{Name: "Alice", Email: "alice@x.io", Age: 30}
	walkStruct(u)
	fmt.Println()

	demoModify()
	fmt.Println()

	demoDynamicCall()
	fmt.Println()

	demoValidator()
	fmt.Println()

	// Bài tập 2 — StructToMap
	fmt.Println("== BT2: StructToMap ==")
	fmt.Printf("  %v\n", StructToMap(u))
	fmt.Println()

	// Bài tập 3 — SetField
	fmt.Println("== BT3: SetField ==")
	uu := User{}
	if err := SetField(&uu, "Name", "Carol"); err != nil {
		fmt.Println("  err:", err)
	}
	if err := SetField(&uu, "Age", 25); err != nil {
		fmt.Println("  err:", err)
	}
	if err := SetField(&uu, "NonExist", 1); err != nil {
		fmt.Println("  err:", err)
	}
	fmt.Printf("  After: %+v\n", uu)
	fmt.Println()

	// Bài tập 4 — DeepEq
	fmt.Println("== BT4: DeepEq ==")
	a := User{Name: "Alice", Email: "a@x.io", Age: 30}
	b := User{Name: "Alice", Email: "a@x.io", Age: 30}
	c := User{Name: "Alice", Email: "a@x.io", Age: 31}
	fmt.Println("  a == b ?", DeepEq(a, b))
	fmt.Println("  a == c ?", DeepEq(a, c))
	fmt.Println("  []int{1,2,3} == []int{1,2,3} ?", DeepEq([]int{1, 2, 3}, []int{1, 2, 3}))
	fmt.Println("  map[a:1] == map[a:1] ?",
		DeepEq(map[string]int{"a": 1}, map[string]int{"a": 1}))
}
