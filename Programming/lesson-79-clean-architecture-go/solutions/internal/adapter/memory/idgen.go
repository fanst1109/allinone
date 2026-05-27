package memory

import (
	"strconv"
	"sync/atomic"

	"cleanarch/internal/usecase"
)

// SeqIDGen implement port usecase.IDGenerator bằng counter tăng dần.
// Đây là adapter cho ID — production có thể thay bằng UUID/snowflake mà
// usecase không cần biết.
type SeqIDGen struct {
	n atomic.Int64
}

// NewSeqIDGen tạo generator bắt đầu từ 1.
func NewSeqIDGen() *SeqIDGen { return &SeqIDGen{} }

var _ usecase.IDGenerator = (*SeqIDGen)(nil)

func (g *SeqIDGen) NewID() string {
	return "u" + strconv.FormatInt(g.n.Add(1), 10)
}
