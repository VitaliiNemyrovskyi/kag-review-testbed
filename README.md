# kag-review-testbed

Тестовий репозиторій для чесного порівняння AI код-рев'ю інструментів (CodeRabbit,
Greptile, PR-Agent, наш KAG-граф-рушій) на 4 реальних, уже виправлених security-багах
з відкритих Rust-проєктів. Кожен кейс — окрема директорія з поточним (безпечним,
post-fix) станом файлу на `main`; окремий PR на кожен кейс відкочує рівно той рядок,
що реальний фікс додав, відтворюючи вразливий стан для сліпого рев'ю.

Це не продакшн-код і не претендує на оригінальність — усі 4 файли скопійовані
один-в-один з реальних, публічних, MIT-ліцензованих проєктів, для дослідницьких/
бенчмаркінгових цілей.

## Кейси

| Директорія | Джерело | Реальний фікс | Guard, що відкочується в PR |
|---|---|---|---|
| `case1-security-rs/` | [artifact-keeper/artifact-keeper](https://github.com/artifact-keeper/artifact-keeper) | [PR #1109](https://github.com/artifact-keeper/artifact-keeper/pull/1109) | `AuthExtension::require_admin()` |
| `case2-pypi-rs/` | artifact-keeper/artifact-keeper | [PR #2087](https://github.com/artifact-keeper/artifact-keeper/pull/2087) | `proxy_helpers::authorize_virtual_members()` |
| `case3-node-lib-rs/` | [denoland/deno](https://github.com/denoland/deno) | [PR #34350](https://github.com/denoland/deno/commit/044bed8486dbc64ef486fbee214d9ecf40cac41b), CVE-2026-49983 | `PermissionsContainer::check_env_all()` |
| `case4-fetch-lib-rs/` | denoland/deno | [PR #35231](https://github.com/denoland/deno/commit/75094e8c10abdf4ad57e7c4a5d0ca3ab7c92c001) | `PermissionsContainer::check_net_unix_socket()` |

Обидва джерельні проєкти — MIT License (© відповідних авторів artifact-keeper та the Deno authors).

## Методологія

Це доповнення до вже проведеного тесту нашого власного KAG-графового рушія (`kag graph_diff`)
проти сліпого general-рев'ю (LLM без графа) на тих самих 4 кейсах — граф впіймав усі 4,
сліпий рев'ю: 0 FOUND / 1 PARTIAL / 3 MISSED (деталі — у приватному проєкті, не в цьому репо).

Тут — та сама перевірка, але з РЕАЛЬНИМИ CodeRabbit/Greptile замість емуляції.
