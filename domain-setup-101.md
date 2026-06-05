# Domain Setup 101: Connecting a Custom Domain to a GitHub Pages Website

## Overview

This document explains how to connect a custom domain (such as `bastionfiberarts.org`) to a website hosted on GitHub Pages. It also provides a basic introduction to the 
underlying technical concepts so that future volunteers can maintain the site or set up additional domains.

---

# Key Concepts

## Domain Name

A **domain name** is a human-readable address for a website.

Examples:

* `bastionfiberarts.org`
* `google.com`
* `wikipedia.org`

People type domain names into browsers instead of remembering IP addresses.

---

## Top-Level Domain (TLD)

The **TLD** is the last part of a domain name.

Examples:

| Domain         | TLD  |
| -------------- | ---- |
| google.com     | .com |
| wikipedia.org  | .org |
| university.edu | .edu |

For Bastion Fiber Arts, the TLD is:

```text
.org
```

---

## DNS (Domain Name System)

DNS is often described as "the phone book of the internet."

DNS translates:

```text
bastionfiberarts.org
```

into the IP address of the server hosting the website.

Without DNS, browsers would not know where to find a website.

---

## Nameservers

Nameservers are the computers responsible for answering DNS questions about a domain.

For Bastion Fiber Arts, the nameservers are:

```text
dns1.registrar-servers.com
dns2.registrar-servers.com
```

These are operated by Namecheap.

When someone asks:

> "Where is bastionfiberarts.org?"

the nameservers provide the answer.

---

## DNS Records

DNS records are the actual instructions stored in DNS.

Common record types include:

### A Record

Maps a domain name directly to an IP address.

Example:

```text
bastionfiberarts.org
    →
185.199.108.153
```

GitHub Pages requires four A records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

---

### CNAME Record

Creates an alias from one hostname to another hostname.

Example:

```text
www.bastionfiberarts.org
    →
harperpack.github.io
```

This tells browsers that the `www` address should resolve through GitHub Pages.

---

## Apex Domain

The apex domain (sometimes called the root domain) is:

```text
bastionfiberarts.org
```

It does not include `www`.

---

## Subdomain

A subdomain adds a prefix.

Examples:

```text
www.bastionfiberarts.org
blog.bastionfiberarts.org
shop.bastionfiberarts.org
```

Here:

```text
www
```

is a subdomain.

---

## GitHub Pages

GitHub Pages is GitHub's static website hosting service.

The Bastion Fiber Arts website is hosted from a GitHub repository and published automatically.

Original GitHub Pages URL:

```text
https://harperpack.github.io/working-fiber-website/
```

Custom public URL:

```text
https://www.bastionfiberarts.org
```

---

# Current Configuration

## GitHub Pages

Repository:

```text
working-fiber-website
```

Custom domain:

```text
www.bastionfiberarts.org
```

The repository contains a file named:

```text
CNAME
```

whose contents are:

```text
www.bastionfiberarts.org
```

---

## Namecheap DNS Records

The following DNS records are configured for the domain:

| Type  | Host | Value                |
| ----- | ---- | -------------------- |
| A     | @    | 185.199.108.153      |
| A     | @    | 185.199.109.153      |
| A     | @    | 185.199.110.153      |
| A     | @    | 185.199.111.153      |
| CNAME | www  | harperpack.github.io |

The `@` symbol means:

```text
bastionfiberarts.org
```

---

# Setting Up a New Domain for GitHub Pages

## Step 1: Buy the Domain

Purchase a domain from a registrar such as Namecheap.

Example:

```text
example.org
```

---

## Step 2: Configure GitHub Pages

Open:

```text
Repository
→ Settings
→ Pages
```

Enter:

```text
www.example.org
```

as the custom domain.

GitHub will create or update a file named:

```text
CNAME
```

containing the domain name.

---

## Step 3: Configure DNS

In Namecheap:

```text
Advanced DNS
→ Host Records
```

Add:

| Type  | Host | Value              |
| ----- | ---- | ------------------ |
| A     | @    | 185.199.108.153    |
| A     | @    | 185.199.109.153    |
| A     | @    | 185.199.110.153    |
| A     | @    | 185.199.111.153    |
| CNAME | www  | username.github.io |

Replace:

```text
username.github.io
```

with the GitHub account hosting the Pages site.

---

## Step 4: Wait for DNS Propagation

DNS changes may take:

* a few minutes
* a few hours
* occasionally up to 24 hours

during which GitHub may report configuration errors.

This is normal.

---

## Step 5: Enable HTTPS

After GitHub validates the domain:

```text
Settings
→ Pages
→ Enforce HTTPS
```

becomes available.

Enable it.

This ensures all traffic is encrypted.

---

# Troubleshooting

## Verify DNS

Check whether the domain resolves correctly:

```bash
dig bastionfiberarts.org
dig www.bastionfiberarts.org
```

Expected result:

```text
www.bastionfiberarts.org
    → harperpack.github.io
```

and

```text
bastionfiberarts.org
    → GitHub IP addresses
```

---

## Query the Authoritative Nameserver

This is the most useful diagnostic command.

```bash
dig @dns1.registrar-servers.com bastionfiberarts.org
```

This bypasses caches and asks Namecheap directly.

If the authoritative server does not show the correct records, the DNS configuration is wrong.

---

## Common Mistake: Creating Records in the Wrong Zone

During Bastion Fiber Arts setup, DNS records were accidentally added under:

```text
www.bastionfiberarts.org
```

instead of:

```text
bastionfiberarts.org
```

As a result:

* GitHub could not validate the domain.
* DNS lookups returned NXDOMAIN.
* HTTPS could not be enabled.

Moving the records into the actual domain zone immediately fixed the problem.

Whenever DNS appears correct but external lookups fail, verify that records were added to the correct domain.

---

# Ongoing Maintenance

Renew annually:

* Domain registration at Namecheap

Monitor:

* GitHub Pages deployment status
* HTTPS certificate status

Avoid changing:

* A records
* CNAME records
* Nameservers

unless intentionally moving the website elsewhere.

If the site remains hosted on GitHub Pages, the current DNS configuration should remain valid indefinitely.

