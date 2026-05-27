# Makefile — build / docker / deploy / loadtest cho URL Shortener (L84).
# Tên biến viết HOA; target dùng .PHONY vì không sinh file cùng tên.

IMAGE   ?= ghcr.io/you/urlshortener
VERSION ?= $(shell git rev-parse --short HEAD 2>/dev/null || echo dev)
CLUSTER ?= urlshortener

.PHONY: help build run vet docker docker-push kind-up kind-load deploy undeploy loadtest loadtest-dry clean

help: ## Liệt kê target
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN{FS=":.*?## "}{printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

build: ## Build binary tĩnh (giống stage builder của Dockerfile)
	CGO_ENABLED=0 go build -trimpath -ldflags="-s -w -X main.Version=$(VERSION)" \
		-o bin/urlshortener ./observability.go

vet: ## go vet toàn bộ
	go vet ./...
	cd loadtest && go vet ./...

run: ## Chạy observability demo (self-test)
	go run ./observability.go

docker: ## Build image (multi-stage, < 20MB)
	docker build -t $(IMAGE):$(VERSION) -t $(IMAGE):latest \
		--build-arg VERSION=$(VERSION) --build-arg COMMIT=$(VERSION) .
	@echo "Kích thước image:" && docker images $(IMAGE):$(VERSION) --format '{{.Size}}'

docker-push: docker ## Push image lên registry
	docker push $(IMAGE):$(VERSION)
	docker push $(IMAGE):latest

kind-up: ## Tạo kind cluster local
	kind create cluster --name $(CLUSTER) || true
	kubectl cluster-info --context kind-$(CLUSTER)

kind-load: docker ## Nạp image vào kind (không cần registry)
	kind load docker-image $(IMAGE):$(VERSION) --name $(CLUSTER)

deploy: ## Apply toàn bộ manifest K8s
	kubectl apply -f k8s/configmap.yaml
	kubectl apply -f k8s/secret.yaml
	kubectl apply -f k8s/deployment.yaml
	kubectl apply -f k8s/service.yaml
	kubectl apply -f k8s/ingress.yaml
	kubectl apply -f k8s/hpa.yaml
	kubectl rollout status deployment/urlshortener --timeout=90s

undeploy: ## Xoá tài nguyên K8s
	kubectl delete -f k8s/ --ignore-not-found

loadtest: ## Load test thật (cần BASE=http://...)
	cd loadtest && go run ./loadtest.go -url $(BASE)/r/abcd -rps 1000 -dur 30s -c 100

loadtest-dry: ## Load test mô phỏng (không cần server)
	cd loadtest && go run ./loadtest.go -rps 1000 -dur 5s -c 100

clean: ## Dọn binary
	rm -rf bin
