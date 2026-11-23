insert into organisation (id, name, slug)
values ('00000000-0000-4000-8000-000000000001', 'Northstar Operations', 'northstar');

insert into app_user (id, organisation_id, identity_subject, email, display_name)
values ('10000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', 'demo-operator', 'operator@example.test', 'Demo Operator');

insert into alert_rule (id, organisation_id, reference, title, status, risk_score, created_by, attributes)
values
('30000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', 'WAT-842', 'Checkout latency burn', 'active', 20, 'demo-operator', '{"source":"reference-seed"}'::jsonb),
('30000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000001', 'WAT-831', 'API error-rate regression', 'pending', 38, 'demo-operator', '{"source":"reference-seed"}'::jsonb);

insert into workflow_event (organisation_id, record_id, event_type, actor_id, to_status, evidence)
select organisation_id, id, 'record.seeded', 'system', status, '{"environment":"reference"}'::jsonb
from alert_rule;
