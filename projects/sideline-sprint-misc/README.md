![Sideline Sprint logo](/img/text-logo-large.png)

![Sideline Sprint newsletter](/img/newsletter.png)

# Sideline Sprint Miscellaneous Work

## What was Sideline Sprint?

Sideline Sprint was a daily sports email newsletter. The goal was to deliver the best of the sports world directly to your inbox every weekday morning. Sideline Sprint was in operation from the beginning of 2021 up until March of 2022.

## What was my role?

I served as a co-founder & the tech lead for the project (but also took on many other tasks as is often the case in startups).

## What did I do?

During my time working on Sideline Sprint, I worked on a variety of unique tasks including but not limited to:
- Built a website from scratch and leveraged cloud infrastructure
- Ensured email alignment on DMARC/DKIM/SPF/BIMI to achieve best-in-class deliverability with an average open rate of ~50%
- Posted all newsletters as articles to our Ghost blog to promote SEO
- Monitored SEO and improved ranking/clicks drastically over our 1.5 years in operation
- Built a referral program from scratch so that readers could bring in others at a low cost per acquisition (CPA)
- Designed the logo and graphics for the website, as well as merchandise for the referral program
- Created a custom responsive email template and setup a custom newsletter writing platform based on TinyMCE
- Setup & administered all of the tools listed in the below sections

## What does this repo contain?

This repo contains miscellaneous code related to the Sideline Sprint project I worked on.

This primarily involves two things:
- Database tables
- Email templates

The database tables were used for the general operation of the newsletter. They housed
things including our readers, staff, and feedback from readers. These were all run
against a Postgres database hosted on DigitalOcean.

The email templates covered everything from signup welcomes, to the daily newsletter,
to referral rewards. There were also email templates used for special events like
Olympics coverage and inviting users to our Discord server. These templates were
written using MJML, then exported to HTML and/or text files depending on the use
case.

We used a variety of email providers during this project, including MailerLite,
Campaign Monitor, and Beehiiv. Certain variables and naming conventions (e.g. cm-...)
are linked to the specific provider we were using at a given time.

## Related works

If you're interested in seeing the other work I did for Sideline Sprint, please take a look at the following repos:
- [Sideline Sprint Main Website](https://github.com/iamdatamatt/sideline-sprint-website)
- [Sideline Sprint Tools Website](https://github.com/iamdatamatt/sideline-sprint-tools)
