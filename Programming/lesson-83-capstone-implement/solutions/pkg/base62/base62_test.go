package base62

import "testing"

func TestEncode(t *testing.T) {
	cases := []struct {
		n    uint64
		want string
	}{
		{0, "0"},
		{1, "1"},
		{61, "z"},
		{62, "10"},
		{125, "21"}, // 2*62 + 1 = 125 (walk-through trong doc)
	}
	for _, c := range cases {
		if got := Encode(c.n); got != c.want {
			t.Errorf("Encode(%d) = %q, want %q", c.n, got, c.want)
		}
	}
}

func TestEncodePadded(t *testing.T) {
	if got := EncodePadded(1, 7); got != "0000001" {
		t.Errorf("EncodePadded(1,7) = %q, want 0000001", got)
	}
	// Khi đã đủ dài thì không cắt bớt.
	if got := EncodePadded(62, 1); got != "10" {
		t.Errorf("EncodePadded(62,1) = %q, want 10", got)
	}
}

func TestRandomLengthAndCharset(t *testing.T) {
	const valid = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	for i := 0; i < 100; i++ {
		s, err := Random(7)
		if err != nil {
			t.Fatalf("Random lỗi: %v", err)
		}
		if len(s) != 7 {
			t.Fatalf("Random(7) độ dài = %d", len(s))
		}
		for _, r := range s {
			found := false
			for _, v := range valid {
				if r == v {
					found = true
					break
				}
			}
			if !found {
				t.Fatalf("ký tự %q không thuộc base62", r)
			}
		}
	}
}

func TestRandomUniqueEnough(t *testing.T) {
	// Không phải test chặt chẽ — chỉ kiểm 7 ký tự sinh ra đa dạng.
	seen := map[string]bool{}
	for i := 0; i < 1000; i++ {
		s, _ := Random(7)
		seen[s] = true
	}
	if len(seen) < 990 {
		t.Errorf("Random sinh quá nhiều trùng: %d/1000 duy nhất", len(seen))
	}
}
