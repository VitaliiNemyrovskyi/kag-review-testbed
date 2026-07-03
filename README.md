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
| `case5-qdrant-snapshot/` | [qdrant/qdrant](https://github.com/qdrant/qdrant) | [PR #3991](https://github.com/qdrant/qdrant/commit/15479a45ffa3b955485ae516696f7e933a8cce8a), CVE-2024-3584 | Тип-рівневий guard: `Path<StrictCollectionPath>` vs слабший сусідній `Path<CollectionPath>` — не виклик функції, а вибір типу в сигнатурі; крос-файловий (правильний патерн — у `collections_api.rs`, вразливий код — у `snapshot_api.rs`) |

Усі 3 джерельні проєкти — MIT License (© відповідних авторів artifact-keeper, the Deno authors, qdrant).

## Методологія

Це доповнення до вже проведеного тесту нашого власного KAG-графового рушія (`kag graph_diff`)
проти сліпого general-рев'ю (LLM без графа) на тих самих 4 кейсах — граф впіймав усі 4,
сліпий рев'ю: 0 FOUND / 1 PARTIAL / 3 MISSED (деталі — у приватному проєкті, не в цьому репо).

Тут — та сама перевірка, але з РЕАЛЬНИМИ CodeRabbit/Greptile замість емуляції.

**Усі коментарі (включно з doc-коментарями) видалені з коду навмисно** — реальний
пре/пост-фікс код мав пояснювальні коментарі, що посилались на реальні issue-номери
(наприклад, `#1034`/`#1032` у кейсі 1), і Greptile у попередньому раунді явно
використав ЦІ коментарі як частину доказу. Щоб перевірити, чи інструменти справді
розуміють наслідки коду, а не читають готове пояснення "чому це важливо" — усі
коментарі прибрані (через `syn`+`prettyplease` round-trip, не regex — безпечно для
рядкових літералів).

**Кейс 5 — складніший навмисно**: guard тут не функція, яку можна знайти пошуком
виклику, а вибір ТИПУ параметра в сигнатурі, і правильний patтерн видно лише
порівнявши з іншим ЕНДПОІНТОМ в ІНШОМУ файлі (`collections_api.rs`). Наш власний
`kag graph_diff` (Фаза 2/3) цей кейс ГАРАНТОВАНО пропускає — `fn_mentions` сканує
лише тіло функції (`item_fn.block`), не сигнатуру, і взагалі не порівнює типи
між файлами. Це відома, задокументована межа поточної реалізації, не прихована.
