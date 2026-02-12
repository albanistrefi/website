---
title: "Ship first, ask questions later"
description: Thoughts on shipping fast, learning from reality, and iterating with intent.
publishDate: 2026-02-12
tags: [product, shipping, AI, Agentic Engineering]
author: Alban Istrefi
draft: false
---
![Sam Altman tweet](../../../assets/sam_altman_move_faster.png)


The most expensive part of building software is no longer writing code. It's everything we do to avoid writing code.

### Building is fast. Everything else around it isn't.

In the traditional way of building software, the actual risk was always pushed to the end, whether you wanted it there or not. That's just how things worked. The cost of building was so high, that everything before building had to justify itself: talk to users, run surveys, validate assumptions, get people internally onboard, build prototypes, test hypotheses. De-risk everything as much as possible before writing a single line of code.

Then you'd work on something for three to six months and finally ship, only to discover that despite all that preparation, nobody actually cared about your product.

These processes made sense when building was slow and expensive. The pain of failure was real, and it was costly. In the current day and age, I would argue that none of this comes remotely close to what truly matters now, and most of us are still operating under the old rules.

### The calculus of risk has inverted

Here is what fundamentally changed, in no-time: AI hasn't just made building faster, it's made it cheap enough that the entire risk-calculation has flipped on its head.

It used to be that betting on the wrong thing to build meant a potentially catastrophic outcome and time wasted. Months of planning, and engineering time burned. So every research parameter had to be checked, every customer interviewed, every survey completed, every stakeholder aligned. You had to be right before you built, because being wrong after you built wasn't an option.

Being wrong faster is exactly what we should aim for now, because the cost is barely comparable, if done right. You can have an idea in the morning, do a first iteration with AI, tell a colleague about it, get them to build on top of it, and finally draft a PRD and start building. A couple of hours later, you might have a fully functional, production-ready proof of concept. What used to take weeks and months now takes a hours and days.

When you can go from idea to functional software in hours instead of months, sitting in validation loops is the risk, and I would even argue that it's even riskier than just shipping that "unfinished" product or feature.

### The technology is ready - act like it.

As I'm writing this in February 2026, I think it's safe to say that with the current level of AI models, software engineering is "solved". I've watched people spin up working products in an afternoon that would have taken a team weeks to build a year ago. This isn't theoretical anymore, it's truly fascinating to witness what people are able to do out there.  A good, and a recent example of this is the way that Cursor managed to [migrate](https://leerob.com/agents) their website from a CMS to raw code and markdown...in three days.

Speed is the key to everything right now. Not reckless speed, but purposeful speed. The kind where you stop debating whether something might work and just go find out instead. 

Of course, certain things must be objectively quality-proof: brand guidelines, good-enough code quality and safety (notice "good enough"), and areas of work that have already been well-defined. But there is no better way to validate an idea than actually putting it in front of customers, as fast as possible.


### We keep asking the wrong questions

"Ship first, ask questions later" feels wrong, and maybe even reckless because we've been trained to believe that asking questions first is what responsible people do. But the problem was always that the questions we ask before building are almost always the wrong questions, because you know, it's hard to know what the right question to ask is.

We ask "would you use this?" instead of watching whether they actually do. We ask "what features do you need?" instead of seeing which ones they ignore. We run a survey that says 80% of users want dark mode, so we build it, and then nobody toggles it on. We interview ten customers who all say they'd pay for a feature, and then zero of them convert when it launches.

We're asking hypothetical questions and treating the answers as data. But hypothetical answers are worth exactly nothing. People don't know what they want until they're using it, and they definitely don't know what they'll pay for until the checkout button is right in front of them.

Shipping first isn't about being careless, it's about rethinking and reordering the process. You're not skipping discovery, you're doing discovery with the only instrument that actually works, reality. And getting to that reality, as fast as possible, is actually possible now - it really is just a mindset change away. It has been obvious to me that you can just do things for a while now, and we didn't really need Sam Altman to [tell us that](https://x.com/sama/status/1870527558783218106?lang=en), with the launch of GPT 5.3 Codex.

### The multiple iterations problem

Getting the first iteration of a product or feature right, and having customers willing to pay for it is extremely [difficult](https://medium.com/agileinsider/how-to-plan-iterations-for-a-new-product-idea-5a708dcc4f18) and rare. This has always been true. The difference is that now, the cost of getting it wrong is almost nothing in comparison. The worst that can happen is that it didn't work - lesson learned, move on.

I'm more convinced than ever that the best way to truly understand if an idea is to any value is to flat out build it, get it out, and see what users think. This is the cheapest form of validation that exists today. Keep iterating if there's signal. If not, don't...

This isn't about abandoning product discovery. It's about accepting that the fastest path to real insight is a shipped product, not a slide deck.

Software as we know it, and as we consume it, is going to be challenged in ways that are extremely difficult to predict. Innovation is about to have no speed limit, and frankly, it's going to be brutal. The teams that ship in days will learn what the teams that ship in months never get the chance to discover.

Not having the urgency to ship isn't a strategic choice. It's a slow way to become irrelevant.

<i>PS: If I were to explain this blog-post in [three words](https://x.com/trq212/status/2010895204405092647), this would be it:</i>

![Why not today tweet](../../../assets/why_not_today.png)
