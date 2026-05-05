# PDF Pipeline API

PDF 문서를 처리하고 파이프라인을 관리하는 NestJS 기반 REST API 서버입니다.

## Developer

- **Name**: Joseph88
- **Email**: pathetic.sim@gmail.com

---

## 프로젝트 구조

```
src/
├── app/            # 루트 모듈 및 앱 부트스트랩
├── config/         # 환경변수 타입 설정 (JWT, RDS, S3)
├── modules/        # 비즈니스 도메인 모듈
├── infrastructure/ # 공유 외부 서비스 연동 (Prisma, S3 등)
└── shared/         # 전역 공통 유틸 (Guard, Interceptor, Filter, Decorator)
```

### 레이어 구조 (각 모듈 공통)

모든 도메인 모듈은 Clean Architecture 원칙에 따라 4개의 레이어로 구성됩니다.

```
modules/<module>/
├── domain/           # 핵심 비즈니스 로직 — 프레임워크 의존성 없음
├── application/      # 유스케이스 및 포트 인터페이스 정의
├── persistence/      # 포트 구현체 (Prisma 기반 DB 어댑터)
├── presentation/     # HTTP 경계 — Controller, DTO
```
---
