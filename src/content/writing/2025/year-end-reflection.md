---
title: "Year-end reflection: building, shipping, and rethinking how we work with AI"
description: Essential security practices for modern web development, including XSS prevention, CSRF protection, and secure authentication patterns.
publishDate: 2025-12-22
updatedDate: 2026-02-08
tags: [Agentic development, AI, Codex, Claude Code]
author: Developer
featured: true
draft: false
---

As 2025 is coming to an end, I wanted to take some time to reflect on the year.

## A year where nothing stayed true for long

2025 has been an insane rollercoaster. Things that felt true one month were outdated the next. The pace has been relentless, but also incredibly inspiring.

At Umbraco, our web development team were an early mover when it came to adopting agentic AI systems for real development work. Not as side experiments. Not just for prototyping. But as something that could genuinely change how we build and ship.

In February, with the launch of Claude Sonnet 3.7, something shifted. It wasn’t a full breakthrough, but it was the first time the direction became clear, at least to me. The model could reason better, hold longer context, and handle more complex tasks than before. You’d get moments where it almost felt like it was there, followed by moments where you still had to step in, or just restart the session. Impressive, but not yet something that truly changed how you worked day to day. 

At the end of May, Sonnet 4 dropped, and this time it really felt like something changed for real. Talking to the model felt different. It didn’t just respond, it got it. It could solve problems at a level that, at least in my experience, simply wasn’t possible before. The general mood in the software development community reflected that as well. The excitement reminded me of the early ChatGPT 3.5 days, when you could feel that a new reality had just been set. Looking back, this was the moment I realised that now, you could just do things. You can have a great idea, and actually execute it! (You can also see it clearly in my GitHub contribution table, where something started to happen around the end of May.)

In June, shortly after the release of Sonnet 4, we decided to roll out Cursor as our main AI development tool. This didn’t happen overnight. I had been making the case for a while with the classic “based on my research, and hands-on experience, I really think we should try this” argument. You know the one - a bit of persistence, a bit of vision, and a lot of “just trust me on this.” (Not blind faith, of course, but the kind of confidence that comes from seeing something was really going to work.) 

Then came the Slack message the day after, along the lines of: 

<blockquote>“I’m really impressed by Cursor’s ability to help me solve a problem I’ve been working on.”
That was the moment. I knew we had crossed a line. There was no going back.</blockquote>

Over the summer, as TUIs started gaining more attention, I spent an unreasonable amount of time testing pretty much everything available; Claude Code, Gemini CLI, and RovoDev.

The differences in output became clear very quickly.

When Claude Code started gaining traction, backed by reports of its reasoning and planning capabilities, we didn’t hesitate. We made the jump in August. The result was another noticeable increase in velocity and developer speed.

What stood out to me wasn’t just faster output, but how quickly ideas could be validated, rejected, or improved. The feedback loop collapsed.

### From tools to velocity - what I’ve learnt

Context management, or what I like to call ‘radical context injection control’, has become increasingly important as the year has gone on. The goal is always the same: get to real work as fast as possible, without polluting the context window before you’ve even started.

I don’t really believe in rigid frameworks for agentic development. I’ve tried them, and they have their place, sure. But for most cases, I’ve found that just talking to the agent clearly and being explicit about what you want to achieve is more than enough.

My current belief is simple: fewer tools are better. MCPs can be useful if used the right way. If not, you will find yourself wondering why you keep hitting compaction before you even have gotten to the real work - MCPs are notorious token killers. I only use them for niche use-cases, for example, the Umbraco MCP is an excellent way for an agent to interact with the Umbraco CMS, which is genuinely valuable.

My agentic development workflow has changed multiple times this year, and it will probably change again. The more I use these systems, the more I question and refine how I work.

Lately, I’ve been leaning heavily into custom slash commands as the core base of my workflow. For me, they’ve turned out to be effective, both for speed and for keeping communication with the agent tight and focused. This comes after trying many different workflows and approaches that simply didn’t work for me. As models keep getting stronger, I believe many of today’s ways of handling context will become irrelevant. What I’m after is something more composable and future-proof. It also needs to work across agents - there is a huge difference between Claude Code & Codex - but both support slash commands. (Well, Claude Code removed them recently, but that’s a different topic.) 

Files such as CLAUDE.md and AGENTS.md are necessary and useful as they are injected by default during each session start. They should, however, be kept as short as possible - a brief project overview and commands to use. Nothing more. Less tooling, less friction, more building.

On a concrete level, I have a “multi-agent” approach. Some folks argue you should stick to one, but I find that this works great for me. I use Claude Code to plan and Codex to execute. Now and then, I use Gemini 3 to review implementations, as well as do some frontend-related work. However, with the launch of Opus 4.5, I find myself trusting Claude Code a lot more when it comes to heavy lifting. It really is an excellent model. 

Throughout the year, or over the past 1.5 years, to be fair, my role has changed dramatically. In my day-to-day work, I don’t just do what a “traditional” Product Manager does. I stay constantly close to the code. One of my screens always has a terminal open, running Codex and Claude Code side by side, with agents implementing features, checking logic, or solving issues on demand.

This allows me to solve product problems while I’m doing other tasks, something I would never have imagined being possible just a year ago.

This year has been the year of the builder. Anyone with an idea can now build. But this also means that what we build and why is becoming more important than ever.

As I’m ending this post, I can’t help but wonder what I’ll be writing a year from now, or what the future has in store. 


Merry Christmas and Happy New Year! 
