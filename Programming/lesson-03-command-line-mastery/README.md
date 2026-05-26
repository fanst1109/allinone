# Lesson 03 — Command Line Mastery

> **Tier 0 — Foundation · Lesson 03**
> Tiền đề: [L02 — Dev Environment & Git](../lesson-02-dev-environment-git/README.md). Bạn đã biết mở terminal, di chuyển thư mục cơ bản (`cd`, `ls`), tạo file (`touch`), và đã có Git hoạt động được. Bài này biến cái terminal "biết một vài lệnh" thành **công cụ năng suất số 1** trong sự nghiệp của bạn.

## Mục tiêu học tập

Học xong lesson này, bạn có thể:

1. **Hiểu vì sao command line không thể thay thế** trong công việc của dev (log, server, automation, scale).
2. **Phân biệt** bash / zsh / fish, biết chọn shell nào và cấu hình `~/.zshrc` cơ bản.
3. **Đọc + viết được pipe chain** kiểu `cmd1 | cmd2 | cmd3` để giải vấn đề thực tế.
4. **Sử dụng thành thạo `find`, `grep`, `sed`, `awk`, `xargs`** — bộ ngũ kim cương xử lý text/file.
5. **SSH vào server**, dùng `scp`/`rsync`, port forwarding, và `tmux` cho session bền vững.
6. **Viết shell script ngắn** (10–50 dòng) để tự động hoá việc lặp đi lặp lại.
7. **Cấu hình alias + function** trong `~/.zshrc` để gõ ít hơn 50%.

---

## 1. Vì sao command line là công cụ năng suất số 1?

> 💡 **Trực giác.** GUI là "đi taxi" — tiện, an toàn, nhưng cố định tuyến đường. Command line là "lái xe riêng" — phải học, dễ đâm, nhưng đi được tới mọi chỗ và **scale ra hàng nghìn việc cùng lúc** mà GUI không thể.

### 1.1 Ba tình huống làm-rồi-mới-thấm

**Tình huống A — Log 1GB cần tìm lỗi.**
- 9h sáng, on-call kêu "service đang trả lỗi 500". Bạn ssh vào server, có file `app.log` 1.2GB.
- Mở bằng VSCode? → đứng máy 30 giây, vẫn không scroll được.
- Lệnh đúng: `grep "ERROR" app.log | tail -20` — 0.4 giây, có ngay 20 lỗi gần nhất.
- **Lệch chính**: GUI cần load cả file vào RAM; pipe chỉ stream từng dòng → handle file vô tận bằng RAM cố định.

**Tình huống B — Đổi tên 500 file ảnh.**
- Designer gửi 500 ảnh tên kiểu `IMG_001.JPG`, `IMG_002.JPG`, ... bạn cần đổi thành `product-001.jpg`, `product-002.jpg`.
- GUI Finder/File Explorer? → chỉ rename được 1 lần 1 file, hoặc tốt nhất là "rename theo pattern" với option giới hạn.
- Lệnh đúng: `for f in IMG_*.JPG; do mv "$f" "product-${f#IMG_}" ; done` rồi `rename 's/\.JPG$/.jpg/' product-*.JPG` — 1.2 giây.
- **Lệch chính**: shell có vòng lặp + biến thay thế trực tiếp trong tên — task này impossible bằng GUI nếu pattern phức tạp hơn 1 chút.

**Tình huống C — Server prod chỉ có terminal.**
- Server thật (EC2, GCP VM, K8s pod) không có màn hình. Bạn ssh vào → chỉ có shell.
- Không có command line → không deploy được, không debug được, không backup được. **Không lựa chọn.**

### 1.2 Ba siêu năng lực của shell

| Siêu năng lực | Ý nghĩa | Ví dụ |
|---------------|---------|-------|
| **Tốc độ** | Gõ `grep "ERROR" log` < 1 giây so với mở GUI mất ~5–30 giây | Tìm lỗi 60× nhanh hơn |
| **Scriptable** | Lệnh hôm nay làm bằng tay → mai gói vào file `.sh` chạy tự động | `cron` mỗi đêm backup DB |
| **Remote-friendly** | Chạy qua ssh, băng thông thấp vẫn dùng được | Quản 100 server từ laptop wifi café |
| **Composable** | Pipe nhỏ ghép thành lớn — không ngôn ngữ GUI nào làm được tương đương gọn | `ps | grep | awk | xargs kill` |

> ⚠ **Lỗi thường gặp.** Nhiều bạn mới học sẽ nghĩ "tôi sẽ chỉ dùng GUI, lương vẫn cao". Thực tế: senior engineer ở mọi công ty công nghệ đều sống trong terminal. Không phải vì "trông pro", mà vì **không có cách nào khác để xử lý log/automation/server ở quy mô thật**.

### 📝 Tóm tắt mục 1
- Command line giải quyết 3 lớp việc GUI không thể: log lớn, automation hàng loạt, server không màn hình.
- 3 siêu năng lực: tốc độ, scriptable, remote-friendly + composable qua pipe.
- Đầu tư 1–2 tuần học CLI bây giờ → tiết kiệm hàng nghìn giờ trong sự nghiệp.

---

## 2. Shell — bash vs zsh vs fish

### 2.1 Shell là gì?

> 💡 **Trực giác.** "Shell" là cái lớp **dịch lệnh bạn gõ thành syscalls cho kernel**. Bạn gõ `ls`, shell parse → tìm chương trình `/bin/ls` → fork process → exec. Không có shell, bạn phải viết C để gọi syscall trực tiếp.

3 shell phổ biến nhất:

| Shell | Mô tả ngắn | Mặc định trên |
|-------|-----------|---------------|
| **bash** (Bourne Again Shell) | Cũ, ổn định, có mặt mọi server Linux | Hầu hết Linux server, WSL |
| **zsh** (Z shell) | Tương thích bash, có completion mạnh, theme đẹp | macOS từ Catalina (2019) |
| **fish** (Friendly Interactive Shell) | Syntax thân thiện, autosuggest tốt, **NHƯNG không tương thích bash** | Không default ở đâu |

### 2.2 Chọn cái nào?

**Khuyến nghị thực tế:**
- **Máy local (laptop)**: `zsh + oh-my-zsh + plugin git, zsh-autosuggestions, syntax-highlighting`. Đẹp + năng suất + tương thích script bash.
- **Server prod (ssh)**: gặp gì dùng nấy, thường là `bash`. Đừng cài zsh trên server — không cần.
- **Script (file `.sh`)**: luôn viết shebang `#!/bin/bash` (hoặc `#!/usr/bin/env bash`). bash có sẵn ở mọi nơi, zsh thì không.

> ❓ **Câu hỏi tự nhiên.** *"Em đã quen bash, có cần đổi sang zsh không?"* Không bắt buộc, nhưng oh-my-zsh có **git status hiển thị trong prompt** (branch hiện tại, dirty/clean) + **completion gợi ý lệnh cũ** → tiết kiệm rất nhiều thao tác. Switch 1 lần đáng đầu tư.

### 2.3 Cài zsh + oh-my-zsh (macOS / Linux)

```bash
# 1. Cài zsh nếu chưa có
brew install zsh                       # macOS
sudo apt install zsh                   # Ubuntu/Debian

# 2. Đổi shell mặc định
chsh -s $(which zsh)

# 3. Cài oh-my-zsh (framework cấu hình)
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 4. Cài plugin autosuggestions + syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting

# 5. Edit ~/.zshrc, dòng plugins:
# plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

Restart terminal → có gợi ý lệnh dạng xám mờ (gõ `→` để chấp nhận), syntax đỏ nếu lệnh sai.

### 📝 Tóm tắt mục 2
- Shell là layer dịch lệnh thành syscalls.
- Dùng `zsh + oh-my-zsh` ở local, `bash` ở server. Script luôn shebang `#!/bin/bash`.
- Plugin autosuggestions + syntax-highlighting tăng tốc gõ lệnh rất rõ rệt.

---

## 3. Navigation & File ops nâng cao

### 3.1 Di chuyển thư mục thông minh

```bash
cd -            # Quay về thư mục TRƯỚC (toggle giữa 2 dir gần nhất)
cd ~            # Về home (cũng có thể chỉ gõ "cd")
cd /var/log     # Đường dẫn tuyệt đối
pushd /tmp      # Đẩy /tmp vào stack, cd vào /tmp
pushd /var/log  # Đẩy /var/log, cd vào /var/log. Stack giờ: [/var/log, /tmp]
popd            # Pop top, cd về /tmp
dirs -v         # Hiển thị stack hiện tại
```

> 💡 **Trực giác.** `cd -` là "nút Back của browser cho terminal". `pushd`/`popd` là "tab" — đẩy nhiều chỗ đang làm dở vào stack, pop ra xài.

**Use case thực:** đang debug trong `/var/log/nginx`, cần qua `/etc/nginx` sửa config rồi quay lại.
```bash
cd /var/log/nginx
tail -f access.log    # đang xem log
# Ctrl+C
pushd /etc/nginx       # qua /etc/nginx, /var/log/nginx được lưu
vim nginx.conf
popd                   # quay lại /var/log/nginx
```

### 3.2 Symlink — `ln -s`

```bash
ln -s /opt/go-1.22 /usr/local/go      # tạo symlink: /usr/local/go → /opt/go-1.22
ls -l /usr/local/go                    # thấy "go -> /opt/go-1.22"
```

**Use case thực**: cài nhiều version Go (1.21, 1.22, 1.23), switch bằng cách trỏ symlink:
```bash
rm /usr/local/go && ln -s /opt/go-1.23 /usr/local/go
```

### 3.3 `tree`, `du`, `df`

```bash
tree -L 2                  # cây thư mục, sâu 2 cấp
tree -L 2 -I "node_modules|.git"  # bỏ qua thư mục rác

du -sh ./node_modules      # kích thước 1 thư mục (human readable)
du -sh */ | sort -h        # mọi sub-folder, sort tăng dần
du -h --max-depth=1 /var   # /var và các con cấp 1

df -h                      # disk free, mọi partition
df -h /                    # chỉ partition gốc
```

**Use case thực**: ổ đầy, tìm thủ phạm:
```bash
du -h --max-depth=1 / 2>/dev/null | sort -h | tail -10
```

### 3.4 Permission — RWX và 755

> 💡 **Trực giác.** Mỗi file có 3 nhóm người: **owner (u) / group (g) / others (o)**. Mỗi nhóm có 3 quyền: **read (r=4) / write (w=2) / execute (x=1)**. Cộng lại thành số 0–7.

| Số | Binary | Quyền |
|----|--------|-------|
| 0 | 000 | --- |
| 1 | 001 | --x |
| 2 | 010 | -w- |
| 3 | 011 | -wx |
| 4 | 100 | r-- |
| 5 | 101 | r-x |
| 6 | 110 | rw- |
| 7 | 111 | rwx |

**Ví dụ đọc số → quyền:**

| Số | u | g | o | Ý nghĩa |
|----|---|---|---|---------|
| `755` | rwx | r-x | r-x | Script executable cho mọi người, chỉ owner sửa được |
| `644` | rw- | r-- | r-- | File text bình thường (owner đọc/ghi, others chỉ đọc) |
| `600` | rw- | --- | --- | Private (vd `~/.ssh/id_rsa`) — chỉ owner đọc/ghi |
| `777` | rwx | rwx | rwx | **NGUY HIỂM** — ai cũng làm gì cũng được |

```bash
chmod 755 deploy.sh        # đặt quyền tuyệt đối
chmod +x deploy.sh          # thêm execute cho mọi người (= u+x,g+x,o+x)
chmod u+x,g-w deploy.sh    # symbolic: thêm exec cho u, xoá write của g
chmod -R 755 ./scripts      # đệ quy

chown alice:devs file.txt   # đổi owner thành alice, group thành devs
chown -R alice ./project    # đệ quy
```

> ⚠ **Lỗi thường gặp — `chmod 777` "cho chắc".** Đừng. `777` nghĩa là cả internet (nếu file lộ qua web) có thể ghi đè. Khoá `id_rsa` mà `777` → ssh **từ chối dùng**. Quy tắc thực hành: script `755`, file text `644`, private key `600`.

### 3.5 Glob patterns

| Pattern | Match | Ví dụ |
|---------|-------|-------|
| `*` | 0 hoặc nhiều ký tự (không match `/`) | `*.go` → `main.go`, `util.go` |
| `?` | đúng 1 ký tự | `?.txt` → `a.txt`, `b.txt` (không match `ab.txt`) |
| `[abc]` | 1 ký tự trong tập | `log[0-9].txt` → `log0.txt`, `log9.txt` |
| `{a,b,c}` | brace expansion (bash) | `cp file.{txt,bak}` → 2 file |
| `**` | đệ quy mọi cấp (cần `shopt -s globstar` bash, hoặc bật mặc định zsh) | `**/*.go` → mọi file Go từ cwd xuống |

**5 ví dụ thực:**

```bash
rm *.log                       # xoá log ở cwd
ls 202?-01-*.csv               # mọi CSV tháng 1 năm 202x
cp file.{txt,md} backup/       # copy 2 file cùng tên khác đuôi vào backup/
mv test_{a,b,c}.go drafts/     # 3 file một lúc
grep "TODO" **/*.go            # tìm TODO trong mọi file .go, đệ quy (zsh / bash globstar)
```

### 🔁 Dừng lại tự kiểm tra

Đọc `rwxr-x---` ra số gì?

<details><summary>Đáp án</summary>

- u: rwx = 7
- g: r-x = 5
- o: --- = 0

→ `750`. Owner full, group đọc + chạy, others không gì.
</details>

### 📝 Tóm tắt mục 3
- `cd -` toggle dir; `pushd`/`popd` dùng stack.
- `chmod 755` script, `chmod 644` text, `chmod 600` private key. Tránh `777`.
- Glob: `*` (nhiều ký tự), `?` (1), `[abc]` (tập), `{a,b}` (brace), `**` (đệ quy).

---

## 4. Pipe & Redirect — Triết lý Unix

### 4.1 Philosophy: "Do one thing well"

> 💡 **Trực giác.** Mỗi lệnh Unix làm **một việc**: `grep` lọc, `sort` sắp, `uniq` dedupe, `wc` đếm. Bạn **lắp ráp** chúng qua pipe để giải vấn đề lớn — y hệt Lego.

**So sánh:**
- Cách Java/Python: viết hàm 30 dòng đọc file, lọc, đếm.
- Cách Unix: `cat log | grep ERROR | wc -l` — 1 dòng, 3 thành phần đã được test 30 năm.

### 4.2 stdin / stdout / stderr — 3 luồng

Mọi process Unix có 3 luồng:

| Tên | Số (fd) | Mặc định |
|-----|---------|----------|
| stdin | 0 | Bàn phím |
| stdout | 1 | Terminal |
| stderr | 2 | Terminal |

Lệnh in ra `stdout` luồng kết quả "ngon", `stderr` luồng lỗi/diagnostic. Tách 2 để bạn có thể **pipe kết quả** mà vẫn **thấy lỗi**.

### 4.3 `|` — Pipe

`cmd1 | cmd2` = stdout của cmd1 nối thẳng vào stdin của cmd2.

```bash
ls -la | grep ".go"             # liệt kê file rồi lọc các file .go
cat /etc/passwd | wc -l         # đếm số dòng (= số user)
ps aux | grep node              # tìm process node
```

### 4.4 `>` `>>` — Redirect stdout

```bash
ls > files.txt          # ghi ra file (OVERWRITE — file cũ bị xoá)
ls >> files.txt         # APPEND (thêm vào cuối)
echo "new line" > log   # ghi đè log thành "new line"
```

> ⚠ **Lỗi thường gặp.** Nhầm `>` thành `>>` → mất hết dữ liệu cũ. Đặc biệt nguy hiểm khi viết script.

### 4.5 `<` — Redirect stdin

```bash
wc -l < /etc/passwd     # tương đương cat /etc/passwd | wc -l (nhưng ít process hơn)
mysql -u root < dump.sql # đẩy file SQL vào stdin của mysql
```

### 4.6 `2>` `2>&1` — Redirect stderr

```bash
go build . 2> errors.log         # lỗi go build (stderr) ghi vào errors.log
go build . > out.log 2> err.log  # tách stdout vs stderr ra 2 file
go build . > all.log 2>&1        # gộp cả 2 vào 1 file (kết quả + lỗi cùng nơi)
go build . &> all.log            # bash shortcut, tương đương dòng trên
go build . 2>/dev/null            # vứt stderr vào hư vô (chỉ giữ stdout)
```

**Use case thực — script CI:**
```bash
./run-tests.sh > test.log 2>&1   # vừa kết quả vừa lỗi gộp vào 1 file để upload artifact
```

> ❓ **Câu hỏi tự nhiên.** *"`2>&1` đọc thế nào?"* Đọc ngược: "redirect fd 2 vào nơi mà fd 1 đang trỏ tới". Nếu phía trước có `> out.log`, fd 1 đang trỏ vào `out.log` → fd 2 cũng vào đó. Nhớ thứ tự: `> out.log 2>&1` (đúng) chứ KHÔNG phải `2>&1 > out.log` (sai — lúc redirect 2, fd 1 còn ở terminal).

### 4.7 5 pipe chain thực tế

**Ví dụ 1 — Đếm số ERROR trong access log:**
```bash
cat access.log | grep "ERROR" | wc -l
```
- `cat access.log`: bơm cả file vào pipe.
- `grep "ERROR"`: chỉ giữ dòng có "ERROR".
- `wc -l`: đếm số dòng.
- Output: `42` (chẳng hạn).

**Ví dụ 2 — Lấy PID của mọi process node:**
```bash
ps aux | grep node | awk '{print $2}'
```
- `ps aux`: liệt kê mọi process, mỗi dòng có columns: USER PID %CPU %MEM ... CMD.
- `grep node`: lọc dòng có "node".
- `awk '{print $2}'`: in cột 2 (= PID).

> ⚠ Phiên bản trên match cả dòng `grep node` chính nó! Cách tránh: `pgrep node` (lệnh built-in cho mục đích này), hoặc `grep "[n]ode"` (regex trick).

**Ví dụ 3 — Top 10 lệnh hay xài trong history:**
```bash
history | awk '{print $2}' | sort | uniq -c | sort -rn | head -10
```
- `history`: ra ~1000 dòng cũ, mỗi dòng `NNNN  cmd args`.
- `awk '{print $2}'`: chỉ lấy lệnh (cột 2).
- `sort`: sắp xếp để dồn cùng lệnh sát nhau (điều kiện của `uniq`).
- `uniq -c`: dedupe + đếm số lần xuất hiện đầu mỗi dòng.
- `sort -rn`: sort number reverse (giảm dần).
- `head -10`: lấy 10 dòng đầu.

Output mẫu:
```
 124 git
  87 cd
  56 ls
  41 vim
  ...
```

**Ví dụ 4 — Sort folder theo kích thước:**
```bash
du -sh */ | sort -h
```
- `du -sh */`: kích thước mỗi sub-folder, human (1K, 4M, 2G).
- `sort -h`: sort human-readable (hiểu 1K < 1M < 1G; sort thường sẽ sort theo string → 1G < 1K).

**Ví dụ 5 — Đếm dòng code mỗi file Go:**
```bash
find . -name "*.go" | xargs wc -l | sort -n
```
- `find . -name "*.go"`: in tên mọi file Go.
- `xargs wc -l`: chạy `wc -l file1 file2 ...` để đếm dòng.
- `sort -n`: sort number tăng dần. File nào dài nhất ở cuối.

### 🔁 Dừng lại tự kiểm tra

Câu hỏi: bạn có file `data.csv` 3 cột. Viết 1 pipe in tổng giá trị cột 2.

<details><summary>Đáp án</summary>

```bash
cat data.csv | awk -F, '{sum += $2} END {print sum}'
```

`-F,` đặt field separator là dấu phẩy. `$2` cột 2. `END` chạy sau khi đọc hết file.
</details>

### 📝 Tóm tắt mục 4
- Triết lý Unix: lệnh nhỏ làm tốt 1 việc, ghép qua pipe.
- `|` pipe stdout → stdin; `>` overwrite; `>>` append; `<` đọc file vào stdin.
- `2>` redirect lỗi; `2>&1` gộp lỗi vào output.
- 90% việc bash hàng ngày là viết pipe chain dạng `extract | filter | transform | aggregate`.

---

## 5. `find` — Tìm file

`find` là **lệnh số 1 để tìm file**. Đừng nhầm với `grep` (tìm nội dung).

```bash
find . -name "*.log"                        # tên match (case sensitive)
find . -iname "*.LOG"                       # case insensitive
find . -type f -name "*.go"                 # chỉ FILE (-type f), không dir
find . -type d -name "node_modules"         # chỉ DIR
find / -type f -size +100M 2>/dev/null      # file > 100MB
find . -size -10k                            # < 10KB
find . -mtime -7                             # sửa trong 7 ngày qua
find . -mtime +30                            # sửa hơn 30 ngày trước
find . -newer reference.txt                  # mới hơn reference.txt
find . -user alice                           # thuộc owner alice
find . -name "*.tmp" -delete                 # tìm + xoá (cẩn thận!)
find . -name "*.log" -exec gzip {} \;        # gzip mỗi file (chạy 1 lệnh / file)
find . -name "*.log" -exec gzip {} +         # gzip tất cả 1 lượt (nhanh hơn)
find . -name "*.go" -exec grep -l "TODO" {} \;  # tìm file Go có TODO
```

> 💡 **Trực giác.** Trong `-exec ... {} \;`, `{}` là placeholder cho mỗi kết quả, `\;` kết thúc câu. Dùng `+` thay `\;` để gộp args (như `xargs`).

**Use case thực:**

```bash
# Xoá file backup cũ hơn 30 ngày
find /var/backups -name "*.bak" -mtime +30 -delete

# Tìm 5 file lớn nhất trong /var/log
find /var/log -type f -exec du -h {} + | sort -h | tail -5

# Tìm mọi file owner là root nhưng nằm trong /home
find /home -user root
```

> ⚠ **Lỗi cực kỳ thường gặp.** `find . -name "*.tmp" -delete` chạy **không hỏi**. Tập thói quen: chạy `find ... -name X` **trước** (chỉ list), kiểm tra kết quả, rồi mới thêm `-delete`.

### 📝 Tóm tắt mục 5
- `find` cho file (theo tên, type, size, mtime, owner). `grep` cho nội dung.
- `-exec ... {} \;` chạy lệnh mỗi kết quả; `{} +` gộp.
- Luôn dry-run (`-name X` chay) trước khi `-delete`.

---

## 6. `grep` — Tìm trong nội dung

```bash
grep "TODO" file.go              # tìm chuỗi "TODO" trong file
grep -r "TODO" .                 # đệ quy, mọi file dưới cwd
grep -i "error" log.txt          # case insensitive
grep -v "DEBUG" log.txt          # invert: loại bỏ dòng có DEBUG
grep -n "func main" *.go         # hiển thị số dòng
grep -l "TODO" *.go              # chỉ in tên FILE có match (không in nội dung)
grep -c "ERROR" log.txt          # đếm số match
grep -A 3 "panic" log            # in match + 3 dòng After
grep -B 3 "panic" log            # 3 dòng Before
grep -C 3 "panic" log            # 3 dòng Context (cả 2 phía)
grep -E "user|admin" file        # regex extended (ERE) — alternative |
grep -P "\d{3}-\d{4}" file       # regex Perl-compatible
grep --include="*.go" -r "TODO" . # chỉ tìm trong .go khi đệ quy
grep --exclude-dir=node_modules -r "TODO" .
```

### 6.1 Ripgrep (`rg`) — Phiên bản hiện đại

`ripgrep` (lệnh `rg`) là grep thế hệ mới: **nhanh hơn 5–10×** nhờ song song hoá + tự skip `.gitignore`.

```bash
# Cài
brew install ripgrep         # macOS
apt install ripgrep          # Ubuntu

rg "TODO"                    # tự đệ quy, tự skip .gitignore/node_modules
rg "TODO" --type go          # chỉ file Go (-tgo cũng được)
rg -i "error"                # case insensitive
rg "func.*Handler" -A 5      # regex + 5 dòng after
```

> 💡 **Khuyến nghị.** Trong dự án thật, dùng `rg` cho mọi việc tìm code. Giữ `grep` cho khi ssh server không có rg.

### 6.2 Regex cơ bản

| Pattern | Match |
|---------|-------|
| `^foo` | dòng bắt đầu bằng "foo" |
| `foo$` | dòng kết thúc bằng "foo" |
| `.` | 1 ký tự bất kỳ |
| `\.` | dấu chấm literal |
| `a*` | 0+ chữ a |
| `a+` | 1+ chữ a (cần `-E` hoặc `-P`) |
| `[abc]` | a hoặc b hoặc c |
| `[^abc]` | KHÔNG phải a/b/c |
| `\d` | digit (cần `-P`) |
| `\s` | whitespace (cần `-P`) |

### 🔁 Dừng lại tự kiểm tra

Viết lệnh tìm dòng có **email** trong mọi file `.txt` (đệ quy, kèm số dòng).

<details><summary>Đáp án</summary>

```bash
grep -rnE "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" --include="*.txt" .
```

Hoặc `rg -n "[\w.+-]+@[\w-]+\.[\w.-]+" -g "*.txt"`.
</details>

### 📝 Tóm tắt mục 6
- `grep -rin` cho 90% case. `-l` chỉ tên file, `-c` đếm, `-C N` context N dòng.
- `rg` nhanh hơn nhiều và tự skip `.gitignore` — ưu tiên dùng local.
- Quen với regex extended (`-E`) là kỹ năng dùng cả đời.

---

## 7. `sed` — Stream Editor

`sed` chỉnh sửa text theo dòng, không cần mở file.

```bash
sed 's/foo/bar/' file            # replace LẦN ĐẦU mỗi dòng (foo → bar)
sed 's/foo/bar/g' file           # replace mọi lần (global)
sed -i 's/foo/bar/g' file        # in-place: ghi đè file luôn
sed -i.bak 's/foo/bar/g' file    # in-place + backup file.bak
sed -n '10,20p' file             # chỉ in dòng 10-20 (-n tắt print mặc định, p in)
sed -n '/^ERROR/p' log           # in dòng bắt đầu bằng ERROR
sed '/^#/d' config               # XOÁ mọi dòng bắt đầu bằng # (comment)
sed '5d' file                    # xoá dòng 5
sed 's/\bfoo\b/bar/g' file       # word boundary (chỉ replace "foo" độc lập, không "football")
sed 's|/usr/bin|/opt/bin|g' file # khi pattern có /, dùng | làm separator
```

**Use case thực 1 — Rename biến `userId` → `user_id` trong tất cả file Go:**

```bash
# Bước 1: dry-run, xem chỗ nào sẽ thay
grep -rn "userId" --include="*.go" .

# Bước 2: thay với backup
find . -name "*.go" -exec sed -i.bak 's/\buserId\b/user_id/g' {} +

# Bước 3: kiểm tra
grep -rn "userId" --include="*.go" .   # phải rỗng
grep -rn "user_id" --include="*.go" .  # phải có

# Bước 4: xoá backup nếu OK
find . -name "*.go.bak" -delete
```

> ⚠ Trên macOS, `sed -i` yêu cầu **đối số sau `-i`** (kể cả rỗng): `sed -i '' 's/.../.../g'`. Trên Linux thì không. Cách an toàn: dùng `sed -i.bak` (luôn yêu cầu đối số) → portable.

**Use case thực 2 — Trích log từ 14:00 đến 14:05:**

```bash
sed -n '/2024-05-26 14:00/,/2024-05-26 14:05/p' app.log
```

`/pattern1/,/pattern2/` là "range": từ dòng match pattern1 đến dòng match pattern2.

### 📝 Tóm tắt mục 7
- `sed s/old/new/g` thay; thêm `-i` để ghi đè.
- `\b...\b` word boundary tránh match nhầm.
- Dry-run bằng `grep` trước khi `sed -i`.

---

## 8. `awk` — Text Processing

> 💡 **Trực giác.** `awk` xử lý **dòng = record, cột = field**. Một dòng `alice 25 engineer` → `$1=alice`, `$2=25`, `$3=engineer`, `$0=cả dòng`, `NF=3` (số field).

```bash
awk '{print $1}' file              # in cột 1 mỗi dòng
awk '{print $1, $3}' file          # cột 1 và 3 (cách bằng OFS = " ")
awk -F, '{print $2}' file.csv      # field separator là dấu phẩy (CSV)
awk -F'\t' '{print $1}' file.tsv   # TSV
awk 'NR==1' file                   # dòng số 1 (NR = Number of Record)
awk 'NR>1' file                    # bỏ header (dòng 2 trở đi)
awk 'NF==3' file                   # chỉ dòng có đúng 3 field
awk '$3 > 100' data.txt            # dòng nào cột 3 > 100
awk '$3 > 100 {sum += $3} END {print sum}' data.txt  # sum có điều kiện
awk '{count[$1]++} END {for (k in count) print k, count[k]}' log  # đếm theo cột 1
```

**Use case thực 1 — Parse nginx access log đếm request theo status:**

Log nginx mỗi dòng:
```
1.2.3.4 - - [26/May/2024:14:00:01 +0000] "GET /api/users HTTP/1.1" 200 1532
1.2.3.4 - - [26/May/2024:14:00:02 +0000] "POST /login HTTP/1.1" 401 89
```

Status code là cột 9.
```bash
awk '{count[$9]++} END {for (s in count) print s, count[s]}' access.log | sort -k2 -rn
```

Output:
```
200 4521
404 312
500 47
401 23
```

**Use case thực 2 — Tính tổng kích thước file Go trong dự án:**
```bash
find . -name "*.go" -exec ls -la {} + | awk '{sum += $5} END {print sum, "bytes"}'
```

Cột 5 của `ls -la` là size.

**Use case thực 3 — Parse CSV: tính trung bình cột "salary":**

`employees.csv`:
```
name,age,salary
Alice,30,5000
Bob,25,4500
Carol,35,6000
```

```bash
awk -F, 'NR>1 {sum += $3; n++} END {print sum/n}' employees.csv
# Output: 5166.67
```

`NR>1` bỏ qua header. `sum += $3` cộng lương. `n++` đếm row. `END` chạy 1 lần sau khi đọc hết file.

> ❓ **Câu hỏi tự nhiên.** *"awk có phải ngôn ngữ lập trình không?"* Có. awk là ngôn ngữ Turing-complete (có if, for, function, array). Nhưng 95% use case chỉ cần `awk '{print $X}'` hoặc agg đơn giản.

### 📝 Tóm tắt mục 8
- awk model: record (dòng) × field (cột). `$0` cả dòng, `$N` cột N, `NF` số cột, `NR` số dòng đã đọc.
- `-F,` đổi separator. `END { ... }` chạy sau cùng để in tổng kết.
- Cực mạnh cho parse log + CSV mà không cần Python.

---

## 9. `xargs` — Pipe input thành argument

> 💡 **Trực giác.** Pipe đẩy data vào **stdin** lệnh tiếp theo. Nhưng nhiều lệnh (`rm`, `mv`, `cp`) đọc **argument**, không phải stdin. `xargs` cầu nối: đọc stdin, biến thành args.

So sánh:
```bash
echo "a.txt b.txt c.txt" | rm        # SAI: rm đọc args, không đọc stdin
echo "a.txt b.txt c.txt" | xargs rm  # ĐÚNG: xargs đẩy thành "rm a.txt b.txt c.txt"
```

```bash
find . -name "*.tmp" | xargs rm           # xoá tất cả file .tmp
find . -name "*.tmp" -delete              # tương đương, nhưng built-in (an toàn hơn với tên có space)
find . -name "*.tmp" -print0 | xargs -0 rm   # -print0/-0 dùng NULL separator → handle tên có space đúng

cat urls.txt | xargs -n 1 curl -O         # tải mỗi URL trong urls.txt
# -n 1 = mỗi lần đưa 1 argument cho curl (vì curl -O nhận 1 URL / lần)

cat urls.txt | xargs -n 1 -P 4 curl -O    # PARALLEL 4 process (tải song song 4 URL)

ls *.png | xargs -I {} convert {} -resize 50% small/{}
# -I {} đặt placeholder; mỗi file ảnh chạy convert thu nhỏ 50%, lưu vào small/
```

**Use case thực — kill mọi process node:**

```bash
ps aux | grep "node" | grep -v grep | awk '{print $2}' | xargs kill -9
# Hoặc gọn hơn:
pkill -9 node
```

> ⚠ **Tên file có space.** `find ... | xargs ...` mặc định split theo whitespace → file tên `my file.txt` bị xé thành 2 args. Cách đúng: `find ... -print0 | xargs -0 ...` (dùng NULL byte). Hoặc dùng `find ... -exec ... {} +` (an toàn sẵn).

### 📝 Tóm tắt mục 9
- xargs = stdin → argument list.
- `-n N` chia thành nhóm N args; `-P N` chạy song song N tiến trình; `-I {}` placeholder.
- Tên file có space → dùng `-print0 | xargs -0` hoặc `find -exec ... +`.

---

## 10. Process & Job control

### 10.1 Xem process

```bash
ps aux                  # mọi process (BSD style)
ps -ef                  # mọi process (System V style)
ps aux | grep nginx     # tìm nginx

top                     # interactive, cập nhật real-time
htop                    # phiên bản đẹp hơn (cần cài: brew install htop)
```

`ps aux` columns: `USER  PID  %CPU  %MEM  VSZ  RSS  TTY  STAT  START  TIME  COMMAND`.

### 10.2 Kill process

```bash
kill 12345              # gửi SIGTERM (signal 15) — process tự dọn rồi tắt
kill -9 12345           # SIGKILL — chết ngay, không dọn (last resort)
kill -HUP 12345         # SIGHUP — reload config (nginx, postgresql tận dụng)
pkill node              # kill theo tên (process có chứa "node")
killall node            # tương tự, kill mọi process tên node
```

> ⚠ **`kill -9` là dao mổ trâu.** Process bị `kill -9` không có cơ hội close DB connection, flush buffer, release lock → có thể để lại lock file orphan, DB không nhất quán. Luôn thử `kill` (SIGTERM) trước.

### 10.3 Foreground / Background — `&`, `Ctrl+Z`, `fg`, `bg`, `jobs`

```bash
./long-task.sh          # chạy ở foreground, terminal bị "khoá"
./long-task.sh &        # chạy ở background NGAY, terminal trả lại prompt

# Đang chạy foreground:
# Ctrl+C   — kill (SIGINT)
# Ctrl+Z   — suspend (SIGTSTP) — pause, vào job list

jobs                    # liệt kê job đang chạy/pause
# [1]+ Stopped       ./long-task.sh
bg                      # resume job mới nhất ở BACKGROUND
fg                      # resume ở FOREGROUND
fg %1                   # resume job số 1
```

**Use case thực — chạy build lâu, muốn làm việc khác:**
```bash
go build ./...           # 30 giây
# bấm Ctrl+Z → suspend
bg                       # đẩy ra background, build tiếp
ls -la                    # làm việc khác trong khi build chạy
# khi build xong, terminal in "[1]+ Done  go build ./..."
```

### 10.4 `nohup` — Chạy tiếp sau khi đóng terminal

```bash
nohup ./server.sh > server.log 2>&1 &
# Đóng terminal, server vẫn chạy.
```

`nohup` (no hangup) ignore SIGHUP. Tuy nhiên dùng `tmux`/`systemd` là approach tốt hơn cho prod.

### 📝 Tóm tắt mục 10
- `ps aux | grep X` tìm process; `kill PID` tắt mềm, `kill -9` cứng (cẩn thận).
- `&` background; `Ctrl+Z` pause; `fg`/`bg` resume; `jobs` list.
- `nohup ... &` cho job chạy sau khi đóng terminal — nhưng tmux/systemd tốt hơn.

---

## 11. `ssh` & `scp` — Remote work

### 11.1 SSH basics

```bash
ssh user@server.com                   # connect (mật khẩu)
ssh -i ~/.ssh/key.pem ec2-user@1.2.3.4 # với private key
ssh -p 2222 user@server.com           # port khác (mặc định 22)
ssh user@server.com 'ls -la /var/log' # chạy 1 lệnh rồi thoát (không vào shell)
```

### 11.2 `~/.ssh/config` — Alias

Thay vì gõ dài, viết alias trong `~/.ssh/config`:

```
Host prod
    HostName ec2-1-2-3-4.compute.amazonaws.com
    User ec2-user
    IdentityFile ~/.ssh/prod.pem
    Port 22

Host staging
    HostName staging.mycompany.com
    User deploy
    ForwardAgent yes
```

Giờ chỉ cần `ssh prod`. `scp` cũng dùng được: `scp file.txt prod:/tmp/`.

### 11.3 `scp` & `rsync` — Copy file qua ssh

```bash
scp local.txt user@host:/remote/path/         # local → remote
scp user@host:/remote/file.txt ./             # remote → local
scp -r ./mydir user@host:/remote/             # đệ quy thư mục

# rsync mạnh hơn scp: chỉ copy phần khác biệt (incremental), nén, resume.
rsync -avz ./src/ user@host:/dest/            # -a archive (preserve perm/time), -v verbose, -z compress
rsync -avz --delete ./src/ user@host:/dest/   # đồng bộ 1 chiều, xoá file dest không có ở src
rsync -avzP big.tar user@host:~/              # -P show progress + resume nếu mất kết nối
```

> 💡 **Khi nào dùng gì?** `scp` cho copy đơn giản 1 file. `rsync` cho thư mục lớn / sync định kỳ / dial-up không ổn định.

### 11.4 Port forwarding — Tunnel

**Use case thực**: DB production chỉ cho phép kết nối từ bastion host. Bạn muốn nối từ laptop.

```bash
ssh -L 5432:db.internal:5432 user@bastion.company.com
```

Đọc: "forward port 5432 **local** của tao đến port 5432 của host `db.internal` qua bastion".

Giờ ở terminal khác:
```bash
psql -h localhost -p 5432 -U dbuser mydb
# Thực tế kết nối tới DB sau bastion.
```

Reverse tunnel (`-R`): mở port trên server để truy cập service local của bạn. Ít dùng hơn.

### 📝 Tóm tắt mục 11
- `ssh user@host` connect; lưu alias trong `~/.ssh/config` để gõ ít.
- `scp` cho file lẻ; `rsync -avzP` cho thư mục lớn / sync.
- `ssh -L local:remote_host:remote_port user@gateway` để tunnel DB/service nội bộ.

---

## 12. `tmux` — Session bền vững

### 12.1 Vấn đề mà tmux giải

Bạn ssh vào server, chạy `npm install` (mất 5 phút). Wifi rớt → ssh disconnect → npm install bị kill → phải làm lại.

`tmux` giải bằng cách **tách terminal khỏi ssh session**. Mọi process chạy trong tmux **tiếp tục dù bạn disconnect**. Đăng nhập lại + `tmux attach` → vẫn thấy y nguyên.

### 12.2 5 lệnh sống còn

```bash
tmux new -s work          # tạo session tên "work"
tmux ls                   # liệt kê session
tmux attach -t work       # quay lại session "work"
tmux kill-session -t work # xoá session
```

Trong tmux, **prefix key mặc định là `Ctrl+b`**. Bấm Ctrl+b, **thả ra**, rồi bấm tiếp:

| Phím | Hành động |
|------|-----------|
| `Ctrl+b d` | **Detach** (thoát tmux nhưng session vẫn chạy) |
| `Ctrl+b "` | **Split horizontal** (chia ngang, 2 pane trên-dưới) |
| `Ctrl+b %` | **Split vertical** (chia dọc, 2 pane trái-phải) |
| `Ctrl+b ←/→/↑/↓` | Di chuyển giữa các pane |
| `Ctrl+b c` | **Create** window mới (như tab) |
| `Ctrl+b n` / `Ctrl+b p` | Next / Previous window |
| `Ctrl+b x` | Đóng pane hiện tại |

**Workflow điển hình:**
```bash
ssh prod
tmux new -s deploy            # tạo session
# Ctrl+b "  → chia ngang
# pane trên: tail -f app.log
# pane dưới: ./deploy.sh
# Ctrl+b d  → detach, đóng laptop
# Ngày mai:
ssh prod
tmux attach -t deploy         # mọi thứ vẫn nguyên
```

### 📝 Tóm tắt mục 12
- tmux = "session sống tiếp sau khi đóng ssh".
- 5 lệnh: `tmux new -s X`, `Ctrl+b d` (detach), `tmux attach -t X`, `Ctrl+b "` (split ngang), `Ctrl+b %` (split dọc).
- Bắt buộc dùng khi làm việc trên server qua ssh — không có lựa chọn tốt hơn.

---

## 13. Shell scripting basics

### 13.1 Cấu trúc tối thiểu

`hello.sh`:
```bash
#!/bin/bash
# Shebang ở dòng 1 — báo OS dùng /bin/bash để chạy file này.

echo "Hello, $1!"      # $1 là argument đầu tiên khi gọi script
```

```bash
chmod +x hello.sh       # cho phép chạy
./hello.sh Alice        # → "Hello, Alice!"
```

### 13.2 Biến

```bash
name="Alice"            # KHÔNG có space quanh dấu = (sai: name = "Alice")
age=25
echo $name              # Alice
echo "${name} is ${age}" # Alice is 25
echo "$name's"           # Alice's
echo '${name}'           # ${name} — single quote KHÔNG expand biến
```

**Command substitution** — chạy lệnh, gán output vào biến:
```bash
today=$(date +%Y-%m-%d)
echo "Today is $today"   # Today is 2024-05-26

count=$(ls *.go | wc -l)
echo "Có $count file Go"
```

### 13.3 If / Test

```bash
if [ -f /etc/passwd ]; then
    echo "file tồn tại"
fi

if [ -d /var/log ]; then
    echo "dir tồn tại"
fi

if [ "$1" = "deploy" ]; then
    echo "deploying..."
elif [ "$1" = "rollback" ]; then
    echo "rolling back..."
else
    echo "Usage: $0 {deploy|rollback}"
    exit 1
fi
```

Test operators:

| Test | Ý nghĩa |
|------|---------|
| `-f file` | file tồn tại (regular) |
| `-d dir` | dir tồn tại |
| `-e path` | tồn tại (file hoặc dir) |
| `-z str` | string rỗng |
| `-n str` | string KHÔNG rỗng |
| `s1 = s2` | string bằng |
| `n1 -eq n2` | số bằng (cũng `-lt`, `-gt`, `-le`, `-ge`, `-ne`) |

### 13.4 For loop

```bash
for f in *.go; do
    echo "Processing $f"
done

for i in 1 2 3 4 5; do
    echo "iteration $i"
done

for i in {1..10}; do      # brace expansion
    echo $i
done

# Đọc từng dòng file:
while IFS= read -r line; do
    echo "Line: $line"
done < input.txt
```

### 13.5 Function

```bash
greet() {
    echo "Hello, $1! You are $2 years old."
}

greet Alice 25            # Hello, Alice! You are 25 years old.
```

### 13.6 Script thực tế — Backup folder

`backup.sh`:
```bash
#!/bin/bash
# Backup một folder thành file .tar.gz có timestamp.
# Usage: ./backup.sh <source-dir> [dest-dir]

set -euo pipefail
# -e: exit ngay nếu lệnh nào fail
# -u: lỗi nếu dùng biến chưa set
# -o pipefail: pipe fail ngay khi 1 lệnh trong pipe fail

SRC="${1:-}"
DEST="${2:-./backups}"

if [ -z "$SRC" ]; then
    echo "Usage: $0 <source-dir> [dest-dir]"
    exit 1
fi

if [ ! -d "$SRC" ]; then
    echo "Error: $SRC không phải thư mục"
    exit 1
fi

mkdir -p "$DEST"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
NAME=$(basename "$SRC")
OUT="$DEST/${NAME}-${TIMESTAMP}.tar.gz"

echo "Backing up $SRC → $OUT"
tar -czf "$OUT" -C "$(dirname "$SRC")" "$NAME"

echo "Done. Size: $(du -sh "$OUT" | cut -f1)"
```

Gọi: `./backup.sh ~/myproject` → tạo `./backups/myproject-20240526-143012.tar.gz`.

### 13.7 Script thực tế — Deploy

`deploy.sh`:
```bash
#!/bin/bash
set -euo pipefail

APP_NAME="myapp"
REMOTE="deploy@prod.example.com"
BUILD_DIR="./build"

echo "[1/4] Building..."
go build -o "$BUILD_DIR/$APP_NAME" ./cmd/server

echo "[2/4] Uploading..."
rsync -avzP "$BUILD_DIR/$APP_NAME" "$REMOTE:/opt/$APP_NAME/"

echo "[3/4] Restarting service..."
ssh "$REMOTE" "sudo systemctl restart $APP_NAME"

echo "[4/4] Health check..."
sleep 3
if curl -fsS "https://prod.example.com/health" > /dev/null; then
    echo "Deploy OK"
else
    echo "Health check FAILED — rollback!"
    ssh "$REMOTE" "sudo systemctl restart ${APP_NAME}-prev"
    exit 1
fi
```

> ⚠ **`set -euo pipefail` là dòng đầu mọi script production**. Không có nó, script lỗi giữa chừng vẫn `exit 0` → bug ngầm.

### 📝 Tóm tắt mục 13
- Shebang `#!/bin/bash`, `chmod +x`, gọi `./script.sh`.
- Biến: `x="v"`, dùng `$x` hoặc `${x}`. Command substitution: `x=$(cmd)`.
- `if [ -f X ]; then ... fi`. `for f in *.x; do ... done`.
- Mọi script production bắt đầu bằng `set -euo pipefail`.

---

## 14. Aliases & Dotfiles

### 14.1 Alias — Gõ ít, làm nhiều

Thêm vào `~/.zshrc` (hoặc `~/.bashrc`):

```bash
# Navigation
alias ..='cd ..'
alias ...='cd ../..'
alias ll='ls -alh'
alias la='ls -A'

# Git (ngoài oh-my-zsh plugin git đã có)
alias gs='git status'
alias gd='git diff'
alias gl='git log --oneline -20'
alias gp='git pull --rebase'

# Tools
alias grep='grep --color=auto'
alias k='kubectl'
alias dc='docker compose'
alias serve='python3 -m http.server 8000'
```

Sau khi sửa: `source ~/.zshrc` để apply ngay (hoặc mở terminal mới).

### 14.2 Function — Phức tạp hơn alias

Alias chỉ thay text. Function có biến + logic.

```bash
# Tạo dir và cd vào nó
mkcd() {
    mkdir -p "$1" && cd "$1"
}

# Extract mọi loại archive
extract() {
    case "$1" in
        *.tar.gz|*.tgz) tar -xzf "$1" ;;
        *.tar.bz2)      tar -xjf "$1" ;;
        *.zip)          unzip "$1" ;;
        *.7z)           7z x "$1" ;;
        *)              echo "Unknown archive: $1" ;;
    esac
}

# Tìm file theo tên, nhanh hơn find . -name
ff() {
    find . -type f -iname "*$1*" 2>/dev/null
}
```

### 14.3 Dotfiles repo

Giữ `.zshrc`, `.gitconfig`, `.vimrc`, `.tmux.conf` trong 1 git repo (gọi là **dotfiles**) → setup máy mới chỉ cần clone + symlink.

```bash
git clone https://github.com/yourname/dotfiles ~/dotfiles
ln -s ~/dotfiles/.zshrc ~/.zshrc
ln -s ~/dotfiles/.gitconfig ~/.gitconfig
```

> 💡 Tham khảo: search "github dotfiles" để xem cách dev pro setup môi trường.

### 📝 Tóm tắt mục 14
- Alias = shortcut text. Function = shortcut có logic.
- `~/.zshrc` là "linh hồn" terminal của bạn — đầu tư setup 1 lần, hưởng lợi cả đời.
- Giữ dotfiles trong git repo riêng → setup máy mới < 5 phút.

---

## 15. Ứng dụng thực tế — Workflow của 1 ngày dev

**8h sáng** — Bật máy:
```bash
tmux new -s daily              # mở session làm việc cố định
# Trong tmux: pane trái = code, pane phải = test
```

**8h30** — Pull code, check status:
```bash
cd ~/projects/myapp
gp && gs                       # gp = git pull --rebase, gs = git status
```

**10h** — On-call alert: lỗi 500 spike trên prod:
```bash
ssh prod                       # alias trong ~/.ssh/config
tmux attach -t monitor || tmux new -s monitor
tail -f /var/log/app.log | grep ERROR
# Tìm pattern lỗi:
grep "ERROR" /var/log/app.log | awk '{print $5}' | sort | uniq -c | sort -rn | head
```

**11h** — Refactor: đổi biến `userId` → `user_id`:
```bash
rg "userId" --type go            # dry run
find . -name "*.go" -exec sed -i.bak 's/\buserId\b/user_id/g' {} +
go test ./...                    # verify
find . -name "*.go.bak" -delete  # xoá backup
```

**14h** — Deploy:
```bash
./deploy.sh                      # script đã viết, chạy 1 lệnh
```

**18h** — Backup project về local trước khi rời:
```bash
rsync -avzP prod:/var/log/app.log ~/logs/$(date +%F).log
```

Tất cả việc trên đều **không mở GUI lần nào**.

---

## Bài tập

> Đặt mục tiêu giải hết bằng pipe/find/grep/sed/awk. Cố không Google — chỉ check sau khi xong.

### BT1
Đếm số file `.go` trong dự án mà có chứa chuỗi `TODO` (mỗi file chỉ tính 1 lần dù có nhiều TODO).

### BT2
Tìm 5 file lớn nhất trong `/var/log` (theo size, sắp giảm dần).

### BT3
Có file `access.log` mỗi dòng format:
```
1.2.3.4 - - [26/May/2024:14:00:01 +0000] "GET /api HTTP/1.1" 500 1532
```
Cột 1 là IP, cột 9 là status code. Viết pipe **đếm số request status 500 từ mỗi IP**, sort giảm dần.

### BT4
Có folder `docs/` chứa nhiều file `.md` (đệ quy). Replace tất cả chuỗi `2023` thành `2024` trong mọi file `.md`, có backup.

### BT5
Viết shell script `backup.sh` nhận 1 tham số là thư mục, output ra file `backup-YYYYMMDD.tar.gz` trong `./backups/`. Có xử lý lỗi nếu thư mục không tồn tại.

### BT6
Lấy 10 commit gần nhất của repo (`git log -10 --pretty=format:'%an'`), lọc commit của author `Alice`, đếm số commit.

---

## Lời giải chi tiết

### Lời giải BT1

```bash
grep -rl "TODO" --include="*.go" . | wc -l
```

- `grep -r` đệ quy. `-l` chỉ in tên file (không in nội dung match). `--include="*.go"` lọc chỉ file Go.
- `grep -l` đảm bảo mỗi file chỉ in 1 lần (dù có nhiều TODO).
- `wc -l` đếm số dòng = số file.

Cách khác dùng `find`:
```bash
find . -name "*.go" -exec grep -l "TODO" {} + | wc -l
```

Cách khác dùng `rg`:
```bash
rg -l "TODO" --type go | wc -l
```

### Lời giải BT2

```bash
find /var/log -type f -exec du -h {} + | sort -h | tail -5
```

- `find /var/log -type f`: mọi file dưới `/var/log`.
- `-exec du -h {} +`: chạy `du -h file1 file2 ...` (gộp 1 lệnh) → in size + path.
- `sort -h`: sort human-readable (1K < 1M < 1G).
- `tail -5`: 5 dòng cuối = 5 file lớn nhất.

Nếu muốn sort giảm dần ngay:
```bash
find /var/log -type f -exec du -h {} + | sort -hr | head -5
```

`-r` = reverse.

### Lời giải BT3

```bash
awk '$9 == 500 {print $1}' access.log | sort | uniq -c | sort -rn
```

Bước-bước:
1. `awk '$9 == 500 {print $1}'`: lọc dòng có status code = 500, in cột 1 (IP).
2. `sort`: gom IP giống nhau sát nhau (cần thiết cho `uniq`).
3. `uniq -c`: đếm số lần mỗi IP xuất hiện, in dạng `  count IP`.
4. `sort -rn`: sort reverse number → IP nào nhiều lỗi nhất ở đầu.

Output mẫu:
```
  42 5.6.7.8
  18 9.10.11.12
   3 1.2.3.4
```

### Lời giải BT4

```bash
# Dry-run: xem chỗ nào sẽ thay
grep -rn "2023" docs/ --include="*.md"

# Thực hiện với backup
find docs/ -name "*.md" -exec sed -i.bak 's/2023/2024/g' {} +

# Kiểm tra
grep -rn "2023" docs/ --include="*.md"   # nên rỗng
grep -rn "2024" docs/ --include="*.md"   # nên có nhiều

# Xoá backup nếu OK
find docs/ -name "*.md.bak" -delete
```

Giải thích `-i.bak`: portable giữa GNU sed (Linux) và BSD sed (macOS). Cả 2 đều yêu cầu suffix cho backup → an toàn.

### Lời giải BT5

```bash
#!/bin/bash
# backup.sh — Backup folder thành .tar.gz có timestamp.
# Usage: ./backup.sh <source-dir>

set -euo pipefail

SRC="${1:-}"
DEST_DIR="./backups"

if [ -z "$SRC" ]; then
    echo "Usage: $0 <source-dir>" >&2
    exit 1
fi

if [ ! -d "$SRC" ]; then
    echo "Error: '$SRC' không phải thư mục hoặc không tồn tại" >&2
    exit 1
fi

mkdir -p "$DEST_DIR"
DATE=$(date +%Y%m%d)
NAME=$(basename "$(realpath "$SRC")")
OUT="$DEST_DIR/backup-${NAME}-${DATE}.tar.gz"

echo "Backing up $SRC → $OUT ..."
tar -czf "$OUT" -C "$(dirname "$(realpath "$SRC")")" "$NAME"

SIZE=$(du -sh "$OUT" | cut -f1)
echo "Done. Output: $OUT ($SIZE)"
```

Test:
```bash
chmod +x backup.sh
./backup.sh ~/myproject
# → backups/backup-myproject-20240526.tar.gz (2.3M)

./backup.sh /khong/ton/tai
# → Error: '/khong/ton/tai' không phải thư mục ... (exit 1)

./backup.sh
# → Usage: ./backup.sh <source-dir> (exit 1)
```

Điểm tinh tế:
- `set -euo pipefail`: fail-fast.
- `${1:-}`: nếu `$1` chưa set thì default rỗng (cần vì `-u` sẽ lỗi nếu dùng biến chưa set).
- `>&2` redirect message lỗi vào stderr (đúng convention).
- `realpath` để xử lý path tương đối + symlink đúng.
- `-C dir name` của `tar`: vào dir cha trước rồi tar mục `name` → trong archive không có path đầy đủ.

### Lời giải BT6

```bash
git log -10 --pretty=format:'%an' | grep -c "^Alice$"
```

- `git log -10 --pretty=format:'%an'`: 10 commit gần nhất, chỉ in author name (mỗi commit 1 dòng).
- `grep -c "^Alice$"`: đếm dòng match đúng "Alice" (anchors `^` `$` để không match nhầm "Alice Smith"/"Alice2").

Hoặc dùng `git log` filter sẵn:
```bash
git log -10 --author="Alice" --oneline | wc -l
```

`--author` của git là regex (substring) → cần exact match thì `--author="^Alice$"`.

---

## Code & Minh hoạ

- `visualization.html` — 3 module tương tác: Pipe Builder, Find/Grep Quiz, Permission Visualizer. Mở local là chạy.

## Bài tiếp theo

[L04 — Đọc code & Debug](../lesson-04-reading-code-debugging/README.md) — sau khi đã thuần shell, bạn cần kỹ năng đọc codebase lớn (>10k LOC) và debug bug khó. CLI bài này là cơ sở để dùng tool như `gdb`, `delve`, `strace`.

## Tham khảo

- [The Art of Command Line](https://github.com/jlevy/the-art-of-command-line) — checklist huyền thoại trên GitHub.
- [Bash Pitfalls](https://mywiki.wooledge.org/BashPitfalls) — 50+ bẫy phổ biến khi viết bash.
- [Explainshell.com](https://explainshell.com) — paste 1 lệnh phức tạp, nó giải thích từng phần.
- [tldr](https://tldr.sh) — `tldr tar` ra ngay 5 use case phổ biến, không như `man tar` (1000 dòng).
