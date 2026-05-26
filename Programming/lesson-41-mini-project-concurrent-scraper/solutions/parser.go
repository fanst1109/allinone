package main

import (
	"bytes"
	"strings"

	"golang.org/x/net/html"
)

// ParseHTML extract title + đếm số thẻ <a href=...>. Dùng tokenizer của
// golang.org/x/net/html — streaming, không build full DOM tree → nhanh +
// ít memory cho file lớn.
//
// Trả ("", 0) nếu input không phải HTML hợp lệ.
func ParseHTML(body []byte) (title string, linksCount int) {
	tokenizer := html.NewTokenizer(bytes.NewReader(body))
	inTitle := false
	var titleBuf strings.Builder

	for {
		tt := tokenizer.Next()
		switch tt {
		case html.ErrorToken:
			// EOF hoặc parse error — kết thúc.
			return strings.TrimSpace(titleBuf.String()), linksCount
		case html.StartTagToken, html.SelfClosingTagToken:
			tok := tokenizer.Token()
			switch tok.Data {
			case "title":
				inTitle = true
			case "a":
				// Đếm <a> có thuộc tính href (link thật, không phải anchor rỗng).
				for _, attr := range tok.Attr {
					if attr.Key == "href" && strings.TrimSpace(attr.Val) != "" {
						linksCount++
						break
					}
				}
			}
		case html.EndTagToken:
			tok := tokenizer.Token()
			if tok.Data == "title" {
				inTitle = false
			}
		case html.TextToken:
			if inTitle {
				titleBuf.Write(tokenizer.Text())
			}
		}
	}
}
