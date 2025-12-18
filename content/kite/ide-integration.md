---
title: IDE Integration
type: docs
weight: 4
---

Writing scripts in **[IntelliJ IDEA](https://www.jetbrains.com/idea/)** is pretty straightforward if you're already familiar that IDE. Most editor features should work after a little setup, which will be described in this section.

<br>

{{% steps %}}

### Prerequisites
- Instance of **[IntelliJ IDEA](https://www.jetbrains.com/idea/)** editor installed on your PC.
- Basic knowledge of **[Kotlin](https://kotlinlang.org)** language and **[Gradle](https://gradle.org)** build system.

<hr>

### Repository
Easiest way to get started is to clone **[EchoNineLabs/KiteScripting](https://github.com/EchoNineLabs/KiteScripting)** repository.
```bash
git clone https://github.com/EchoNineLabs/KiteScripting.git
```
Once cloned, open it as a project in **[IntelliJ IDEA](https://www.jetbrains.com/idea/)** and load included **[Gradle](https://gradle.org)** configuration.

<hr>

### Configuration
There is one thing you need to enable before you can start writing scripts, and that is, adding `.kite.kts` as recognizable script definition.  

1. Go to **Settings ➜ Languages & Frameworks ➜ Kotlin ➜ Kotlin Scripting** and click **Scan Classpath** button at the bottom.
2. Once **1 new definition(s) found in classpath** text appears, click **Apply** then **OK**.
3. Re-open the same settings page and make sure **Kite Script** definition (`.kite.kts`) is listed and enabled.

![IntelliJ IDEA](https://i.postimg.cc/KYZQx2pb/image.png)

<hr>

### Writing Scripts
Scripts can be put pretty much anywhere but it is recommended to keep them in `src` directory.

You can also organize them within sub-directories like explained in [**Getting Started**](/kite/getting-started/#structure) guide but in mind importing additional files with `@file:Import`  is currently not supported due to editor bug / limitations.


{{% /steps %}}