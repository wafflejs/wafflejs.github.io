Sponsorship
===========
<title>· Sponsorship</title>

About
-----
WaffleJS is a monthly meetup centered around programming, waffles, and karaoke.
It started when Visnu and Billy went to [BrooklynJS][brooklynjs]. They were inspired by
the event and wanted to organize a Bay Area technology meetup that would do
these things:

- Have attendees actually meet and talk to one another.
- Promote a diverse and inclusive environment.
- Get people to have fun.

Today the meetup is co-organized by
[Visnu Pitiyanuvath][@visnup],
[Billy Roh][@billyroh],
[Emily Rose][@nexxylove],
[Kelly King][@kng],
[Max Goodhart][@chromakode],
[Katrina Uychaco][@kuychaco],
[Anami Lopez][@anami-sf],
[Hannah Johnson][@hanndull],
[Andy Tuba][@andytuba],
[Kevin Arthur][@heykevinarthur],
[Nat Alison][@tesseralis],
and [Potch][@potch].

It's held at [SoMa StrEat Food Park][map] every first Wednesday of the month.

Sponsorship Packages
--------------------
1 Month      | 3 Months     | 6 Months
:-----------:|:------------:|:------------:
$500 total   | $1,350 total | $2,400 total
Full Price   | Save 10%     | Save 20%

During the event, sponsors have a chance to talk to attendees in a casual
setting. Here are some other things you get with your sponsorship:

- **Stage time:**
  Two minutes of stage time to do whatever you want with (the more creative the
  better).
- **Free tickets:**
  Two tickets for people at your company (please, no recruiters).
- **Swag and merch:**
  Place to put stickers and swag on the check-in desk or on tables around the
  venue.
- **Branding:**
  Featured in the emails to the attendees and shown on wafflejs.com.
- **Opt-in email list:**
  We ask all attendees whether they'd like to be contacted by sponsors. We'll
  share the contact information of those (and only those) who have opted in.
- **Brunch:**
  Every three months, we invite sponsors, speakers and performers to have
  [brunch][brunch] together.

History
-------
The first session was in August 2015 and it has been held monthly ever since.
We use funds to cover the cost of food, the venue, and equipment. We donate
all unused funds each month to non-profits such as [Girls Who Code][girlswhocode] and
[Black Girls Code][blackgirlscode].

<table>
  <thead>
    <tr>
      <th style="text-align:left">Year</th>
      <th style="text-align:left">Month</th>
      <th style="text-align:left">Sponsors</th>
      <th style="text-align:left"></th>
      <th style="text-align:left"></th>
      <th style="text-align:right">Attendees</th>
    </tr>
  </thead>
  <tbody ng-repeat="(year, months) in calendar">
    <tr ng-repeat="date in months">
      <td><span ng-show="$first">{{::year}}</span></td>
      <td><a ui-sref="index({day: date.day})">{{::date.day | date:"MMMM"}}</a></td>
      <td ng-repeat="index in [0, 1, 2]">
        <span ng-if="date.sponsors.length >= (index + 1)" ng-repeat="(name, url) in date.sponsors[index]">
          <a href="{{::url}}">{{::name}}</a>
        </span>
      </td>
      <td style="text-align:right">{{::date.attendees}}</td>
    </tr>
  </tbody>
</table>

Speakers & Attendees
--------------------
Our past speakers have worked as developers at established companies, as well
as smaller startups. Here are a few of those companies:

- Google
- Mozilla
- Dropbox
- Square
- Stripe
- npm

Our attendees are roughly the same ratio of people from larger and smaller
companies, leaning toward smaller startups. Around 35% of our attendees are
women.

Diversity
---------
We believe this industry can and should be more inclusive. Here are the things
we do to make that happen:

- **Donations:**
  We donate all proceeds to non-profits such as [Girls Who Code][girlswhocode] and
  [Black Girls Code][blackgirlscode].
- **Student sponsorships:**
  We sponsor students to come to the event so they can meet more people in the
  industry. So far, we’ve had students from Waterloo, Stanford, Hackbright, and
  Hack Reactor.
- **Diverse speakers:**
  We make sure that we have a wide range of speakers at each of our events,
  with an eye toward gender, racial, and socioeconomic diversity.

FAQs
----
### How do I sponsor an event?
If you’re interested in sponsoring WaffleJS, please contact us at
<sponsorship@wafflejs.com>.

### Can we have a speaker the same month that we sponsor?
We don't select speakers the same month their company sponsors us. We do
however encourage you to submit for the next month or use your 2-minute spot
during intros for short talk ideas.

### How many sponsors do you have per month?
We have up to three sponsors per month.

[@visnup]: https://twitter.com/visnup
[@billyroh]: https://twitter.com/billyroh
[@nexxylove]: https://twitter.com/nexxylove
[@kng]: https://twitter.com/kng
[@chromakode]: https://twitter.com/chromakode
[@kuychaco]: https://twitter.com/kuychaco
[@anami-sf]: https://github.com/anami-sf
[@hanndull]: https://github.com/hanndull
[@andytuba]: https://twitter.com/andytuba
[@heykevinarthur]: https://github.com/heykevinarthur
[@tesseralis]: https://twitter.com/tesseralis
[@potch]: https://twitter.com/potch
[blackgirlscode]: http://www.blackgirlscode.com/
[brooklynjs]: http://brooklynjs.com
[brunch]: https://ti.to/wafflejs/brunch
[girlswhocode]: http://girlswhocode.com/
[map]: https://goo.gl/maps/0gkOe
