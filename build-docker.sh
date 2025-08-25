#!/bin/bash

# ========================================
# FRONTEND NIKKO HOTEL - DOCKER BUILD SCRIPT
# ========================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
IMAGE_NAME="frontend-nikko-hotel"
IMAGE_TAG="latest"
BUILD_CONTEXT="."
DOCKERFILE="Dockerfile"
PUSH_IMAGE=false
REGISTRY=""

# Function to print usage
print_usage() {
    echo -e "${BLUE}Usage:${NC}"
    echo -e "  $0 [OPTIONS]"
    echo -e ""
    echo -e "${BLUE}Options:${NC}"
    echo -e "  -n, --name NAME        Docker image name (default: frontend-nikko-hotel)"
    echo -e "  -t, --tag TAG          Docker image tag (default: latest)"
    echo -e "  -c, --context PATH     Build context path (default: .)"
    echo -e "  -f, --file FILE        Dockerfile path (default: Dockerfile)"
    echo -e "  -p, --push             Push image to registry after build"
    echo -e "  -r, --registry REG     Docker registry URL"
    echo -e "  -h, --help             Show this help message"
    echo -e ""
    echo -e "${BLUE}Examples:${NC}"
    echo -e "  $0                                    # Build with default settings"
    echo -e "  $0 -t v1.0.0                         # Build with specific tag"
    echo -e "  $0 -n myapp -t v1.0.0               # Build with custom name and tag"
    echo -e "  $0 -p -r myregistry.com             # Build and push to registry"
    echo -e "  $0 --name myapp --tag v1.0.0 --push # Build and push with long options"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -n|--name)
            IMAGE_NAME="$2"
            shift 2
            ;;
        -t|--tag)
            IMAGE_TAG="$2"
            shift 2
            ;;
        -c|--context)
            BUILD_CONTEXT="$2"
            shift 2
            ;;
        -f|--file)
            DOCKERFILE="$2"
            shift 2
            ;;
        -p|--push)
            PUSH_IMAGE=true
            shift
            ;;
        -r|--registry)
            REGISTRY="$2"
            shift 2
            ;;
        -h|--help)
            print_usage
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            print_usage
            exit 1
            ;;
    esac
done

# Validate inputs
if [[ -z "$IMAGE_NAME" ]]; then
    echo -e "${RED}Error: Image name cannot be empty${NC}"
    exit 1
fi

if [[ -z "$IMAGE_TAG" ]]; then
    echo -e "${RED}Error: Image tag cannot be empty${NC}"
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running or not accessible${NC}"
    exit 1
fi

# Check if build context exists
if [[ ! -d "$BUILD_CONTEXT" ]]; then
    echo -e "${RED}Error: Build context directory '$BUILD_CONTEXT' does not exist${NC}"
    exit 1
fi

# Check if Dockerfile exists
if [[ ! -f "$BUILD_CONTEXT/$DOCKERFILE" ]]; then
    echo -e "${RED}Error: Dockerfile '$BUILD_CONTEXT/$DOCKERFILE' does not exist${NC}"
    exit 1
fi

# Full image name
FULL_IMAGE_NAME="$IMAGE_NAME:$IMAGE_TAG"
if [[ -n "$REGISTRY" ]]; then
    FULL_IMAGE_NAME="$REGISTRY/$FULL_IMAGE_NAME"
fi

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  FRONTEND NIKKO HOTEL - DOCKER BUILD${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e ""
echo -e "${YELLOW}Build Configuration:${NC}"
echo -e "  Image Name: ${GREEN}$FULL_IMAGE_NAME${NC}"
echo -e "  Build Context: ${GREEN}$BUILD_CONTEXT${NC}"
echo -e "  Dockerfile: ${GREEN}$DOCKERFILE${NC}"
echo -e "  Push Image: ${GREEN}$PUSH_IMAGE${NC}"
echo -e ""

# Build the Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
if docker build \
    --tag "$FULL_IMAGE_NAME" \
    --file "$BUILD_CONTEXT/$DOCKERFILE" \
    --target production \
    --build-arg BUILDKIT_INLINE_CACHE=1 \
    "$BUILD_CONTEXT"; then
    
    echo -e "${GREEN}✅ Docker image built successfully!${NC}"
    echo -e ""
    
    # Show image info
    echo -e "${YELLOW}Image Information:${NC}"
    docker images "$FULL_IMAGE_NAME" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"
    echo -e ""
    
    # Push image if requested
    if [[ "$PUSH_IMAGE" == true ]]; then
        if [[ -z "$REGISTRY" ]]; then
            echo -e "${RED}Error: Registry URL is required when pushing image${NC}"
            exit 1
        fi
        
        echo -e "${YELLOW}Pushing image to registry...${NC}"
        if docker push "$FULL_IMAGE_NAME"; then
            echo -e "${GREEN}✅ Image pushed successfully to registry!${NC}"
        else
            echo -e "${RED}❌ Failed to push image to registry${NC}"
            exit 1
        fi
    fi
    
    echo -e ""
    echo -e "${GREEN}🎉 Build completed successfully!${NC}"
    echo -e ""
    echo -e "${YELLOW}To run the container:${NC}"
    echo -e "  docker run -p 3001:3001 $FULL_IMAGE_NAME"
    echo -e ""
    echo -e "${YELLOW}Or use docker-compose:${NC}"
    echo -e "  docker-compose up -d"
    echo -e ""
    echo -e "${YELLOW}Access the application at:${NC}"
    echo -e "  http://localhost:3001"
    
else
    echo -e "${RED}❌ Docker build failed!${NC}"
    exit 1
fi
