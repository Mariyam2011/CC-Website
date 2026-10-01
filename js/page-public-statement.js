/* ==========================================================================
   PAGE — Public Statement  (/public-statement)
   --------------------------------------------------------------------------
   Ported verbatim (English + Urdu) from the equivalent standalone page on
   the live site. Sits inside the shared header/footer shell — see
   css/statement.css for why the language toggle only flips this page's own
   content to RTL, not the site chrome around it.

   This is a factual, already-published statement — do not edit the wording
   without updating it to match the live site, since this is the company's
   own public position on a real incident.
   ========================================================================== */

(function (window, document) {
  'use strict';

  const CC = (window.CC = window.CC || {});
  const esc = CC.esc;

  (CC.pageModules = CC.pageModules || {})['public-statement'] = function () {
    const root = document.querySelector('[data-part2]');
    if (!root) return;

    const home = CC.url('index.html');

    root.innerHTML = `
      <div class="stmt-root">
        <header class="stmt-hero">
          <div class="stmt-hero-inner">
            <div class="stmt-hero-top">
              <div class="stmt-lang-toggle" role="group" aria-label="Language">
                <button type="button" class="is-active" data-stmt-lang="en">English</button>
                <button type="button" data-stmt-lang="ur">اردو</button>
              </div>
              <a href="${esc(home)}" class="stmt-back">Back to Home</a>
            </div>

            <p class="stmt-cat" data-lang="en">Public Statement</p>
            <p class="stmt-cat" data-lang="ur">عوامی بیان</p>

            <h1 class="stmt-title" data-lang="en">When a School Counselor Uses Their Position to Take Credit for a Student's <em>Success</em></h1>
            <h1 class="stmt-title" data-lang="ur">جب ایک اسکول کاؤنسلر اپنے عہدے کا استعمال طالب علم کی <em>کامیابی</em> کا کریڈٹ لینے کے لیے کرے</h1>

            <div class="stmt-meta" data-lang="en">
              <span>Published February 2026</span><span>·</span><span>5 min read</span>
            </div>
            <div class="stmt-meta" data-lang="ur">
              <span>فروری ۲۰۲۶ میں شائع شدہ</span><span>·</span><span>۵ منٹ کی پڑھائی</span>
            </div>
          </div>
        </header>

        <div class="stmt-wrap">
          <div class="stmt-body">

            <div data-lang="en">
              <p class="stmt-lede">
                This is not a statement we wanted to make. But when someone in a position of institutional trust
                uses that position to mislead families, staying silent stops being an option.
              </p>

              <h2 class="stmt-h2">What Happened</h2>
              <p>
                One of our students was recently accepted to <strong>Brown University — an Ivy League
                institution — with 120% financial aid.</strong> This result followed months of dedicated work
                between the student and College Crafters: strategic school selection, profile building,
                narrative building, multiple rounds of essay development, financial aid guidance, and close
                collaboration with the student's family throughout the process.
              </p>
              <p>
                Shortly after the acceptance became known, a separate consulting firm posted the student's
                name, photograph, school name, acceptance details, and financial aid information on their
                social media — presenting it as though they had been involved.
              </p>
              <div class="stmt-callout">
                <p><strong>They were not involved.</strong> They did not counsel, guide, or assist this student
                in any capacity. She was not their client. The family did not engage their services. There was
                no working relationship of any kind.</p>
              </div>
              <p>
                Neither the student nor her family were contacted or made aware before the post went live. This
                directly violates the family's contractual agreement with College Crafters and constitutes the
                unauthorized use of a minor's personal information for commercial purposes.
              </p>

              <div class="stmt-break"></div>

              <h2 class="stmt-h2">How They Got the Information</h2>
              <p>
                What makes this situation more troubling than a simple case of stolen credit is
                <strong>how the information was obtained.</strong>
              </p>
              <p>
                The individual who runs this firm is also <strong>a counselor at the student's school.</strong>
                This means they have access — through their institutional role — to student records, academic
                outcomes, university decisions, and personal details. Access that exists to serve students
                within the school, not to build marketing material for a private business.
              </p>
              <div class="stmt-callout">
                <p>This raises a question that extends beyond one student: <strong>If a school counselor is
                using their institutional access to promote their private business, how many other students
                have had their information used the same way — without ever knowing?</strong></p>
              </div>
              <p>
                When someone occupies a position of trust within a school and simultaneously runs a business
                that profits from the outcomes of that school's students, there is an inherent conflict of
                interest. Families trust school counselors to act in the best interest of their children. That
                trust should not be commercialised.
              </p>

              <div class="stmt-break"></div>

              <h2 class="stmt-h2">Why We Are Speaking Publicly</h2>
              <p>
                We considered handling this privately. But this issue isn't private — it is systemic. If we
                stay silent, the next family that visits that firm's page will see results they didn't produce
                and have no way of knowing the difference.
              </p>
              <div class="stmt-fact">
                <h3 class="stmt-fact-h">Our Reasoning</h3>
                <p><strong>1. Families deserve accurate information</strong> when choosing who to trust with
                their child's future. Misleading marketing in this industry has real consequences.</p>
                <p><strong>2. Consent is not optional.</strong> No firm should post a student's name, photo, or
                results without explicit permission from the student and their family.</p>
                <p><strong>3. Institutional access carries responsibility.</strong> If a school counselor is
                using their position to source content for a private business, the school community has a
                right to know.</p>
              </div>

              <div class="stmt-break"></div>

              <h2 class="stmt-h2">What We Encourage Every Parent to Ask</h2>
              <p>
                Whether you are considering College Crafters or any other consultancy, we encourage every
                family to ask these questions:
              </p>
              <div class="stmt-q-list">
                <div class="stmt-q-item"><span class="stmt-q-num">01</span><p class="stmt-q-text">Can you
                  connect me directly with a student and family you've worked with — not just show me a
                  graphic?</p></div>
                <div class="stmt-q-item"><span class="stmt-q-num">02</span><p class="stmt-q-text">Did the
                  student and their family give you written consent to post their results?</p></div>
                <div class="stmt-q-item"><span class="stmt-q-num">03</span><p class="stmt-q-text">Can you walk
                  me through the actual work — the essays, the strategy, the school list?</p></div>
                <div class="stmt-q-item"><span class="stmt-q-num">04</span><p class="stmt-q-text">Does your
                  counselor hold any position at my child's school? If so, how is the conflict of interest
                  managed?</p></div>
                <div class="stmt-q-item"><span class="stmt-q-num">05</span><p class="stmt-q-text">If this
                  student's result appears on another firm's page, which firm actually did the work — and can
                  you prove it?</p></div>
              </div>
              <p>
                If a consultancy cannot answer these questions clearly and directly, that tells you everything
                you need to know.
              </p>

              <div class="stmt-break">· · ·</div>

              <h2 class="stmt-h2">Our Commitment</h2>
              <div class="stmt-teal-callout">
                <p>Every result we share is a result we earned — <strong>through documented work with the
                student, alongside their family, and with their written consent.</strong></p>
              </div>
              <p>
                We do not have access to school databases. We do not have institutional shortcuts. We do not
                post outcomes we did not produce.
              </p>
              <p>
                We have the work. We have the relationships. And we have the receipts.
              </p>
              <p>
                If you or your family have experienced something similar — with any firm — we encourage you to
                speak up. The only way this industry improves is when families demand accountability.
              </p>
              <div class="stmt-teal-callout">
                <p>Reach us at <strong>@thecollegecrafters</strong> on Instagram, or contact us directly through
                our website. Our DMs are open.</p>
              </div>

              <div class="stmt-cta-section">
                <a href="${esc(home)}" class="stmt-cta-btn">See Our Results →</a>
              </div>
            </div>

            <div data-lang="ur">
              <p class="stmt-lede">
                یہ وہ بیان نہیں ہے جو ہم دینا چاہتے تھے۔ لیکن جب ادارتی اعتماد کے عہدے پر فائز کوئی شخص اس عہدے کا
                استعمال خاندانوں کو گمراہ کرنے کے لیے کرے، تو خاموش رہنا ممکن نہیں رہتا۔
              </p>

              <h2 class="stmt-h2">کیا ہوا</h2>
              <p>
                ہمارے ایک طالب علم کو حال ہی میں <strong>براؤن یونیورسٹی — ایک آئیوی لیگ ادارے — میں ۱۲۰ فیصد مالی
                امداد کے ساتھ</strong> داخلہ ملا۔ یہ نتیجہ طالب علم اور کالج کرافٹرز کے مابین مہینوں کی محنت کا ثمر
                تھا: اسٹریٹجک اسکول کا انتخاب، پروفائل بلڈنگ، بیانیہ تعمیر، مضامین کے متعدد مسودے، مالی امداد کی
                رہنمائی، اور پورے عمل میں طالب علم کے خاندان کے ساتھ قریبی تعاون۔
              </p>
              <p>
                داخلے کی خبر سامنے آنے کے فوراً بعد، ایک علیحدہ مشاورتی فرم نے طالب علم کا نام، تصویر، اسکول کا نام،
                داخلے کی تفصیلات، اور مالی امداد کی معلومات اپنے سوشل میڈیا پر پوسٹ کر دیں — اس انداز میں جیسے وہ اس
                عمل میں شامل تھے۔
              </p>
              <div class="stmt-callout">
                <p><strong>وہ شامل نہیں تھے۔</strong> انہوں نے اس طالب علم کی کسی بھی حیثیت میں مشاورت، رہنمائی، یا
                مدد نہیں کی۔ وہ ان کی کلائنٹ نہیں تھی۔ خاندان نے ان کی خدمات حاصل نہیں کیں۔ کسی قسم کا کوئی کام کا
                رشتہ نہیں تھا۔</p>
              </div>
              <p>
                نہ تو طالب علم اور نہ ہی اس کے خاندان سے پوسٹ شائع ہونے سے پہلے رابطہ کیا گیا یا انہیں آگاہ کیا گیا۔
                یہ خاندان کے کالج کرافٹرز کے ساتھ معاہدے کی براہ راست خلاف ورزی ہے اور تجارتی مقاصد کے لیے ایک نابالغ
                کی ذاتی معلومات کا غیر مجاز استعمال ہے۔
              </p>

              <div class="stmt-break"></div>

              <h2 class="stmt-h2">انہیں معلومات کیسے ملیں</h2>
              <p>
                اس صورتحال کو چوری شدہ کریڈٹ کے سادہ معاملے سے زیادہ تشویشناک بنانے والی بات یہ ہے کہ
                <strong>معلومات کیسے حاصل کی گئیں۔</strong>
              </p>
              <p>
                اس فرم کو چلانے والا فرد <strong>طالب علم کے اسکول میں کاؤنسلر بھی ہے۔</strong> اس کا مطلب یہ ہے کہ
                انہیں اپنے ادارتی کردار کے ذریعے طالب علموں کے ریکارڈ، تعلیمی نتائج، یونیورسٹی فیصلوں اور ذاتی
                تفصیلات تک رسائی حاصل ہے۔ یہ رسائی اسکول کے اندر طالب علموں کی خدمت کے لیے ہے، نہ کہ نجی کاروبار کے
                لیے مارکیٹنگ مواد بنانے کے لیے۔
              </p>
              <div class="stmt-callout">
                <p>یہ ایک ایسا سوال اٹھاتا ہے جو ایک طالب علم سے آگے جاتا ہے: <strong>اگر ایک اسکول کاؤنسلر اپنی
                ادارتی رسائی کا استعمال اپنے نجی کاروبار کو فروغ دینے کے لیے کر رہا ہے، تو کتنے اور طالب علموں کی
                معلومات اسی طرح استعمال ہوئی ہیں — بغیر ان کے علم کے؟</strong></p>
              </div>
              <p>
                جب کوئی شخص اسکول میں اعتماد کے عہدے پر فائز ہو اور بیک وقت ایسا کاروبار چلائے جو اسی اسکول کے طالب
                علموں کے نتائج سے منافع کماتا ہو، تو اس میں مفادات کا بنیادی تصادم ہے۔ خاندان اسکول کاؤنسلرز پر
                اعتماد کرتے ہیں کہ وہ ان کے بچوں کے بہترین مفاد میں کام کریں گے۔ اس اعتماد کو تجارتی مقاصد کے لیے
                استعمال نہیں کیا جانا چاہیے۔
              </p>

              <div class="stmt-break"></div>

              <h2 class="stmt-h2">ہم عوامی طور پر کیوں بول رہے ہیں</h2>
              <p>
                ہم نے اسے نجی طور پر حل کرنے پر غور کیا۔ لیکن یہ مسئلہ نجی نہیں ہے — یہ نظامی ہے۔ اگر ہم خاموش رہیں
                تو اگلا خاندان جو اس فرم کا صفحہ دیکھے گا، وہ ایسے نتائج دیکھے گا جو انہوں نے حاصل نہیں کیے اور فرق
                جاننے کا کوئی طریقہ نہیں ہوگا۔
              </p>
              <div class="stmt-fact">
                <h3 class="stmt-fact-h">ہماری استدلال</h3>
                <p><strong>۱. خاندانوں کو درست معلومات کا حق ہے</strong> جب وہ فیصلہ کر رہے ہوں کہ اپنے بچے کے
                مستقبل کے لیے کس پر اعتماد کریں۔ اس صنعت میں گمراہ کن مارکیٹنگ کے حقیقی نتائج ہوتے ہیں۔</p>
                <p><strong>۲. رضامندی اختیاری نہیں ہے۔</strong> کسی بھی فرم کو طالب علم یا ان کے خاندان کی واضح
                اجازت کے بغیر طالب علم کا نام، تصویر، یا نتائج پوسٹ نہیں کرنے چاہییں۔</p>
                <p><strong>۳. ادارتی رسائی کے ساتھ ذمہ داری آتی ہے۔</strong> اگر کوئی اسکول کاؤنسلر اپنے عہدے کا
                استعمال نجی کاروبار کے لیے مواد حاصل کرنے کے لیے کر رہا ہے، تو اسکول کمیونٹی کو جاننے کا حق ہے۔</p>
              </div>

              <div class="stmt-break"></div>

              <h2 class="stmt-h2">ہر والدین سے کیا سوالات پوچھنے کی تاکید</h2>
              <p>
                چاہے آپ کالج کرافٹرز یا کسی اور مشاورتی ادارے پر غور کر رہے ہوں، ہم ہر خاندان کو یہ سوالات پوچھنے کی
                ترغیب دیتے ہیں:
              </p>
              <div class="stmt-q-list">
                <div class="stmt-q-item"><span class="stmt-q-num">۰۱</span><p class="stmt-q-text">کیا آپ مجھے
                  براہ راست کسی طالب علم اور خاندان سے ملوا سکتے ہیں جن کے ساتھ آپ نے کام کیا ہو — صرف ایک گرافک
                  دکھانے کی بجائے؟</p></div>
                <div class="stmt-q-item"><span class="stmt-q-num">۰۲</span><p class="stmt-q-text">کیا طالب علم اور
                  ان کے خاندان نے آپ کو ان کے نتائج پوسٹ کرنے کی تحریری اجازت دی ہے؟</p></div>
                <div class="stmt-q-item"><span class="stmt-q-num">۰۳</span><p class="stmt-q-text">کیا آپ مجھے اصل
                  کام کے بارے میں بتا سکتے ہیں — مضامین، حکمت عملی، اسکولوں کی فہرست؟</p></div>
                <div class="stmt-q-item"><span class="stmt-q-num">۰۴</span><p class="stmt-q-text">کیا آپ کا
                  کاؤنسلر میرے بچے کے اسکول میں کوئی عہدہ رکھتا ہے؟ اگر ہاں، تو مفادات کے تصادم کو کیسے سنبھالا جاتا
                  ہے؟</p></div>
                <div class="stmt-q-item"><span class="stmt-q-num">۰۵</span><p class="stmt-q-text">اگر اس طالب علم
                  کا نتیجہ کسی اور فرم کے صفحے پر نظر آئے، تو اصل میں کس فرم نے کام کیا — اور کیا آپ ثابت کر سکتے
                  ہیں؟</p></div>
              </div>
              <p>
                اگر کوئی مشاورتی ادارہ ان سوالات کا واضح اور براہ راست جواب نہیں دے سکتا، تو یہ آپ کو سب کچھ بتا دیتا
                ہے جو آپ کو جاننے کی ضرورت ہے۔
              </p>

              <div class="stmt-break">· · ·</div>

              <h2 class="stmt-h2">ہمارا عہد</h2>
              <div class="stmt-teal-callout">
                <p>ہم جو بھی نتیجہ شیئر کرتے ہیں وہ ایسا نتیجہ ہے جو ہم نے کمایا ہے — <strong>طالب علم کے ساتھ مستند
                کام کے ذریعے، ان کے خاندان کے ساتھ مل کر، اور ان کی تحریری رضامندی کے ساتھ۔</strong></p>
              </div>
              <p>
                ہمیں اسکول کے ڈیٹابیس تک رسائی نہیں ہے۔ ہمارے پاس ادارتی شارٹ کٹ نہیں ہیں۔ ہم ایسے نتائج پوسٹ نہیں
                کرتے جو ہم نے حاصل نہیں کیے۔
              </p>
              <p>
                ہمارے پاس کام ہے۔ ہمارے پاس رشتے ہیں۔ اور ہمارے پاس ثبوت ہیں۔
              </p>
              <p>
                اگر آپ یا آپ کے خاندان نے کسی بھی فرم کے ساتھ ایسا تجربہ کیا ہے — تو آواز اٹھائیں۔ اس صنعت میں بہتری
                صرف اسی وقت آئے گی جب خاندان جوابدہی کا مطالبہ کریں۔
              </p>
              <div class="stmt-teal-callout">
                <p>ہم سے انسٹاگرام پر <strong>thecollegecrafters@</strong> پر رابطہ کریں، یا ہماری ویب سائٹ کے ذریعے
                براہ راست رابطہ کریں۔ ہمارے DMs کھلے ہیں۔</p>
              </div>

              <div class="stmt-cta-section">
                <a href="${esc(home)}" class="stmt-cta-btn">ہمارے نتائج دیکھیں ←</a>
              </div>
            </div>

          </div>
        </div>
      </div>`;

    const stmtRoot = root.querySelector('.stmt-root');
    const buttons = root.querySelectorAll('[data-stmt-lang]');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.stmtLang;
        const isUr = lang === 'ur';
        stmtRoot.classList.toggle('is-ur', isUr);
        buttons.forEach((b) => b.classList.toggle('is-active', b === btn));
        document.title = isUr ? 'عوامی بیان | College Crafters' : 'Public Statement | College Crafters';
      });
    });

    CC.initComponents(root);
  };
})(window, document);
