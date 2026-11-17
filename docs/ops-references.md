# Operations references

Public, real-world operating standards to copy from instead of inventing.
UK government teams publish both their rules and their infrastructure code.

## Rulebooks (how to operate)

| Source | Read for |
|---|---|
| [The GDS Way](https://gds-way.digital.cabinet-office.gov.uk/) | GDS engineering standards: hosting, logging, monitoring, alerting, operating a service |
| [GDS Way: How to manage alerts](https://gds-way.digital.cabinet-office.gov.uk/standards/alerting.html) | Alert only when users are affected, action is needed, and it is sustained. Status belongs on dashboards, not pagers |
| [GDS Way: How to monitor your service](https://gds-way.digital.cabinet-office.gov.uk/standards/monitoring.html) | External uptime checks, user-journey smoke tests, error tracking, Prometheus + Grafana metrics |
| [GDS Way: How to manage technical incidents](https://gds-way.digital.cabinet-office.gov.uk/standards/incident-management.html) | Priority levels and the 10-step incident workflow (lead → contain → recover → communicate → resolve) |
| [GDS Way: How GDS provides user support](https://gds-way.digital.cabinet-office.gov.uk/standards/user-support.html) | 1st / 2nd / 3rd line support model and on-call rotas |
| [GOV.UK Service Manual](https://www.gov.uk/service-manual) | Service standard, measuring success, operating and iterating a live service |
| [GOV.UK Developer Docs](https://docs.publishing.service.gov.uk/) | How a large platform documents every repo: owner team, alert channel, runbooks |
| [MoJ Developer Portal: Monitoring an app](https://developer-portal.service.justice.gov.uk/docs/cloud-platform/monitoring-an-app) | App metrics into Prometheus, custom alerts, Pingdom checks, PrometheusRule lint in CI |

## Infrastructure code (how it is built)

| Repo | Read for |
|---|---|
| [alphagov/govuk-infrastructure](https://github.com/alphagov/govuk-infrastructure) | Terraform for GOV.UK on AWS EKS; shared GitHub Actions (release, tests, security) reused across repos; ADRs |
| [alphagov/govuk-helm-charts](https://github.com/alphagov/govuk-helm-charts) | Application config deployed GitOps-style with Argo CD |
| [ministryofjustice/cloud-platform](https://github.com/ministryofjustice/cloud-platform) | MoJ hosting platform: component inventory, runbooks, public issue tracker |
| [ministryofjustice/cloud-platform-terraform-monitoring](https://github.com/ministryofjustice/cloud-platform-terraform-monitoring) | Real Prometheus alert rules (`resources/prometheusrule-alerts`), Alertmanager routing to Slack and PagerDuty |
| [ministryofjustice/cloud-platform-prometheus](https://github.com/ministryofjustice/cloud-platform-prometheus) | Older but readable walkthrough: Prometheus Operator, Alertmanager → PagerDuty/Slack |

## Reference stack these teams converge on

```
Terraform (IaC) → AWS EKS (Kubernetes) → Argo CD (GitOps deploys)
Prometheus + Grafana (metrics) · Sentry (errors) · Pingdom (external checks) · browser smoke tests
Alertmanager → Slack (#high-priority / #lower-priority) + PagerDuty (on-call person)
```

## Rules worth adopting as-is

- Every repo documents its owner team and where its alerts go.
- Alerts use a sustained window (Prometheus `for:`) so blips do not page anyone.
- A dead container or a single failed task is not an alert; the orchestrator recovers it.
- Every incident is written down from minute one using a template, then reviewed blamelessly.
