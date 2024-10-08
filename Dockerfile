# Set ARGs for building
ARG ACCOUNT_ID
ARG GITHUB_TOKEN
ARG BUILDER_IMAGE

# Stage 1: Builder
FROM ${BUILDER_IMAGE} AS builder

# Set working directory
WORKDIR /app

# Install git and SSL certificates
RUN apk update && apk add --no-cache git ca-certificates tzdata && update-ca-certificates

# Configure git credentials for accessing private repositories
RUN git config --global url."https://${GITHUB_TOKEN}@github.xyz.com/".insteadOf "https://github.xyz.com/"

# Create a non-root user for the app
RUN adduser --disabled-password \
  --gecos "" \
  --home "/nonexistent" \
  --shell "/sbin/nologin" \
  --no-create-home \
  --uid "${UID}" \
  "${USER}"

# Set necessary environment variables for Go module usage
ENV GO111MODULE=on
ENV GOPRIVATE=github.com

# Copy go.mod and go.sum and download dependencies
COPY ./go.mod ./go.sum ./
RUN go mod download && go mod verify

# Copy the application code
COPY . .

# Build the Go application
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o server ./cmd/server/main.go

# Stage 2: Final image
FROM scratch

# Copy necessary files from builder stage
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group
COPY --from=builder /app/server ./

# Use the non-root user created in builder stage
USER apprunner:apprunner

# Expose application port
EXPOSE 8080

# Set entrypoint to run the Go application
ENTRYPOINT ["./server"]
