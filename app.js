phina.globalize();

phina.define('TitleScene', {
    superClass: 'DisplayScene',
    init: function(param/*{}*/) {
        this.superInit(param);

        const self = this;

        this.backgroundColor = "white";

        Label({
            text: "愚形ちゃん",
            fontSize: 64,
        })
        .addChildTo(this)
        .setPosition(this.gridX.center(0), this.gridY.center(-6));

        Sprite("title")
        .addChildTo(this)
        .setPosition(this.gridX.center(0), this.gridY.center(-2.5));

        LabelArea({
            text: "※囲碁の棋譜(SGF)を読み込んで、愚形（サカレ形、二目の頭、アキ三角）を検出する…というツールを作ろうとしたものですが、検出精度が悪くて実用性がなく、保留中です。",
            width: 500,
            height: 300,
            fontSize: 25,
        }).addChildTo(this)
        .setPosition(this.gridX.center(0), this.gridY.center(3));

        const loadButton = MyButton({
            text: "クリップボードから読み込む",
            width: 500,
            height: 100,
            fill: "white",
            fontColor: "black",
            stroke: "black",
            strokeWidth: 5,
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(4.5));
        loadButton.selected = function() {
            navigator.clipboard
                .readText()
                .then((clipText) => {
                    const sgf = new SgfParser();

                    try {
                        const parsed = sgf.parse(clipText);
                        console.log(parsed);
                        alert("読み込み成功！");
                        if (parsed.props.SZ !== "19") {
                            alert("しかし、19路盤しか対応していません。");
                            return;
                        }
                        self.exit("GameScene", {kifu: parsed});
                    } catch (e) {
                        alert("正常に読み込めませんでした。");
                        return;
                    }

                });
        };

        const sampleButton = MyButton({
            text: "サンプル棋譜で試す",
            width: 500,
            height: 100,
            fill: "white",
            fontColor: "black",
            stroke: "black",
            strokeWidth: 5,
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(6.5));
        sampleButton.selected = function() {
            const sgf = new SgfParser();

            // const sample = "(;GM[1]SZ[19]KM[7]RU[Chinese]RE[W+R]PB[miguruta (1473)]PW[nken6516 (1369)];B[pc];W[dq];B[do];W[co];B[cn];W[cp];B[dm];W[fq];B[cj];W[cd];B[qp];W[pe];B[nd];W[qc];B[qb];W[qd];B[rb];W[qh];B[kq];W[kc];B[mc];W[fc];B[hc];W[ke];B[he];W[fe];B[nf];W[kg];B[hg];W[fg];B[hi];W[ch];B[ki];W[lh];B[li];W[mh];B[nj];W[oh];B[pi];W[mi];B[mj];W[ph];B[hq];W[op];B[pn];W[qq];B[rq];W[pq];B[nq];W[np];B[mp];W[mo];B[lp];W[nn];B[po];W[kn];B[kl];W[in];B[ho];W[hn];B[gn];W[gm];B[fn];W[io];B[hp];W[il];B[lo];W[ln];B[mm];W[mn];B[er];W[eq];B[fr];W[ds];B[gr];W[gk];B[fh];W[eh];B[fi];W[ei];B[fj];W[rr];B[rp];W[sr];B[oq];W[pp];B[oo];W[no];B[om];W[nm];B[nl];W[km];B[qi];W[oi];B[oj];W[ri];B[rj];W[rh];B[qk];W[bj];B[bk];W[bi];B[bn];W[bo];B[bq];W[dr];B[ao];W[ap];B[an];W[bp];B[gb];W[fb];B[fa];W[ea];B[ga];W[ec];B[gg];W[ff];B[se];W[re];B[sc];W[sf];B[sd];W[oe];B[ne];W[gc];B[ib];W[id];B[hd];W[lb];B[mb];W[ck];B[bl];W[dj];B[bs];W[br];B[dp];W[cq];B[of];W[qf];B[pr];W[qr];B[or];W[eo];B[dn];W[fo];B[go];W[ek];B[cl];W[dk];B[fm];W[fl];B[jl];W[jm];B[ik];W[hk];B[ij];W[ip];B[lm];W[jq];B[jr];W[kp];B[lr];W[iq];B[ir];W[ps];B[os];W[qs];B[jg];W[jf];B[kh];W[ig];B[lg];W[jh];B[mg];W[ie];B[hf];W[ii];B[ji];W[ih];B[jc];W[jd];B[kb];W[if];B[lc];W[kd];B[lf];W[kf];B[pf];W[pd];B[od];W[rc];B[sb];W[rd];B[ko];W[jo];B[jp];W[ic];B[jb];W[kp];B[fk];W[mq];B[lq];W[hj];B[kk];W[hh];B[gh];W[sq];B[sp];W[ol];B[nk];W[pm];B[qm];W[on];B[pl];W[qo])";
            // const sample = "(;FF[1]CA[UTF-8]SZ[19]PB[COMLv5級]PW[COMLv5級]BS[11]WS[11]KM[0.0]HA[2]RU[Chinese]AP[みんなの囲碁]VW[]GN[みんなの囲碁]GC[]DT[2025-02-04 09:44:21]RE[B+5.0]AB[pd][dp];W[pp];B[dd];W[qf];B[nc];W[rd];B[qc];W[qi];B[nq];W[lq];B[qq];W[qp];B[pq];W[op];B[nr];W[mo];B[rp];W[ro];B[rq];W[qn];B[dj];W[fq];B[cn];W[dr];B[cq];W[fo];B[gp];W[fp];B[jq];W[jo];B[lr];W[kr];B[kq];W[mr];B[lp];W[mq];B[mp];W[ls];B[np];W[jr];B[iq];W[ir];B[hr];W[hq];B[hp];W[gq];B[io];W[kp];B[ko];W[jp];B[ip];W[jn];B[in];W[jm];B[im];W[jl];B[il];W[jk];B[ik];W[jj];B[ij];W[ji];B[ii];W[jh];B[ih];W[jg];B[ig];W[jf];B[if];W[je];B[hd];W[cc];B[cd];W[dc];B[ec];W[eb];B[fc];W[fb];B[gb];W[bd];B[be];W[bc];B[cf];W[no];B[lo];W[ln];B[kn];W[lm];B[km];W[kl];B[of];W[oh];B[mg];W[mh];B[lh];W[lg];B[nh];W[mi];B[ng];W[ni];B[lf];W[kg];B[pg];W[qg];B[ph];W[pi];B[qh];W[rh];B[rc];W[qd];B[pe];W[fm];B[fk];W[dm];B[cm];W[dl];B[cl];W[dk];B[ck];W[ej];B[ek];W[cj];B[di];W[ci];B[dh];W[ch];B[cg];W[bg];B[bf];W[bk];B[bl];W[bi];B[ag];W[ah];B[bh];W[oq];B[or];W[bg];B[af];W[aj];B[bh];W[pr];B[qr];W[bg];B[ad];W[ac];B[bh];W[gc];B[gd];W[bg];B[db];W[cb];B[bh];W[hc];B[ic];W[bg];B[fa];W[da];B[bh];W[hb];B[ib];W[bg];B[ha];W[bh];B[cr];W[le];B[me];W[ld];B[md];W[lc];B[sd];W[re];B[se];W[sf];B[sc];W[rg];B[qe];W[rf];B[er];W[fr];B[ds];W[eq];B[dq];W[fs];B[es];W[mb];B[nb];W[na];B[oa];W[ma];B[pb];W[kb];B[dn];W[em];B[al];W[ak];B[gl];W[gm];B[hm];W[ie];B[he];W[eo];B[do];W[go];B[en];W[ns];B[ps];W[sp];B[sq];W[so];B[og];W[oi];B[jc];W[kf];B[mf];W[ja];B[jb];W[kc];B[ia];W[ka];B[jd];W[kd];B[id];W[ms];B[os];W[ae];B[oo];W[on];B[ad];W[qs];B[rs];W[ae];B[po];W[qo];B[ad];W[dg];B[eg];W[ae];B[df];W[ad];B[mc];W[ea];B[ga];W[fl];B[gk];W[fn];B[hn];W[gn];B[pf];W[ho];B[el];W[hs];B[ep];W[tt];B[tt])";
            // const sample = "(;FF[1]CA[UTF-8]SZ[19]PB[COMLv6級]PW[COMLv4級]BS[10]WS[12]KM[0.0]HA[2]RU[Chinese]AP[みんなの囲碁]VW[]GN[みんなの囲碁]GC[]DT[2025-02-03 22:23:40]RE[W+9.0]AB[pd][dp];W[cd];B[pp];W[cn];B[fq];W[bp];B[cq];W[ck];B[ed];W[df];B[cc];W[bc];B[dc];W[be];B[hc];W[nq];B[lq];W[qn];B[np];W[mp];B[mq];W[op];B[no];W[oo];B[oq];W[pq];B[nr];W[or];B[nq];W[qp];B[pr];W[po];B[qq];W[rq];B[pp];W[qr];B[pq];W[rr];B[rp];W[qo];B[nm];W[qk];B[qi];W[nc];B[oc];W[nd];B[pf];W[jc];B[lc];W[ld];B[kd];W[kc];B[md];W[le];B[mc];W[me];B[nb];W[oe];B[pe];W[ob];B[mb];W[pc];B[od];W[ne];B[pb];W[je];B[id];W[jd];B[hf];W[jg];B[hh];W[ji];B[hj];W[jk];B[hl];W[jm];B[in];W[jn];B[io];W[jo];B[jp];W[kp];B[kq];W[mn];B[nn];W[nk];B[ml];W[mk];B[ll];W[lk];B[kl];W[jl];B[kk];W[kj];B[ij];W[jj];B[ko];W[kn];B[lp];W[lo];B[mo];W[kp];B[ip];W[bq];B[br];W[cp];B[dq];W[ar];B[bs];W[do];B[eo];W[en];B[fo];W[fn];B[gn];W[gm];B[hm];W[di];B[fm];W[em];B[fl];W[el];B[ek];W[dk];B[ej];W[ei];B[fi];W[fh];B[gi];W[ff];B[ge];W[og];B[pg];W[oh];B[ph];W[rj];B[ri];W[si];B[sh];W[sj];B[rg];W[ib];B[hb];W[ha];B[ga];W[ia];B[fb];W[cb];B[db];W[bb];B[oi];W[ni];B[oj];W[nj];B[ok];W[nl];B[ol];W[mm];B[ko];W[ln];B[ql];W[rl];B[qm];W[rm];B[qj];W[pm];B[pl];W[fe];B[fd];W[ie];B[he];W[ic];B[hd];W[lb];B[la];W[kb];B[oa];W[ka];B[ma];W[dj];B[of];W[nf];B[pk];W[rk];B[om];W[pn];B[qs];W[rs];B[ps];W[ro];B[ee];W[ef];B[de];W[ce];B[ca];W[ba];B[da];W[gg];B[hg];W[fk];B[gl];W[fj];B[ih];W[jh];B[if];W[jf];B[gh];W[ii];B[gf];W[fg];B[gj];W[kp];B[dn];W[dm];B[ko];W[fa];B[gb];W[kp];B[co];W[bo];B[ko];W[cr];B[dr];W[kp];B[nh];W[ng];B[ko];W[rh];B[sg];W[kp];B[sp];W[so];B[ko];W[aq];B[kp];W[as];B[cs];W[gk];B[hk];W[ik];B[im];W[il];B[hi];W[on];B[dd];W[ig];B[tt];W[tt])";
            const sample = "(;FF[1]CA[UTF-8]SZ[19]PB[COMLv6級]PW[COMLv初段]BS[10]WS[16]KM[0.0]HA[4]RU[Chinese]AP[みんなの囲碁]VW[]GN[みんなの囲碁]GC[]DT[2025-02-03 22:02:43]RE[W+R]AB[pd][dp][pp][dd];W[qf];B[nd];W[qn];B[nq];W[rp];B[qq];W[pl];B[dj];W[fc];B[hc];W[fe];B[df];W[jc];B[he];W[fg];B[hg];W[fi];B[dh];W[fk];B[dl];W[je];B[jg];W[lf];B[lg];W[mf];B[of];W[mg];B[lh];W[mh];B[li];W[mi];B[lj];W[mc];B[nc];W[mb];B[nb];W[rd];B[qc];W[rc];B[rb];W[sb];B[qb];W[ph];B[oh];W[oi];B[pg];W[qg];B[pi];W[qh];B[oj];W[ni];B[pk];W[nk];B[nj];W[mj];B[mk];W[ol];B[ml];W[ok];B[pj];W[qk];B[ec];W[fb];B[eb];W[hb];B[ib];W[ic];B[gb];W[hd];B[ha];W[gd];B[fa];W[gc];B[hb];W[jb];B[ie];W[id];B[jf];W[kf];B[kg];W[fm];B[dn];W[kk];B[lk];W[kl];B[mn];W[lm];B[mm];W[lq];B[ko];W[iq];B[io];W[gp];B[go];W[fo];B[hp];W[hq];B[fp];W[gq];B[fn];W[eo];B[gn];W[ep];B[en];W[dq];B[cq];W[cp];B[do];W[eq];B[cr];W[dr];B[bp];W[cs];B[bs];W[ds];B[br];W[hk];B[ij];W[ik];B[jj];W[jn];B[jo];W[in];B[kn];W[hn];B[ho];W[gm];B[jm];W[im];B[il];W[hm];B[jl];W[jk];B[km];W[hi];B[hj];W[gj];B[gh];W[fh];B[gi];W[kj];B[ki];W[ji];B[jh];W[ii];B[gf];W[ff];B[kq];W[kr];B[jq];W[jr];B[lp];W[mq];B[mp];W[nr];B[oq];W[or];B[pr];W[rq];B[rr];W[oe];B[ne];W[pe];B[nf];W[od];B[oc];W[qd];B[pc];W[pa])";
            // const sample = "(;FF[1]CA[UTF-8]SZ[19]PB[COMLv10級]PW[COMLv二段]BS[6]WS[17]KM[6.5]HA[0]RU[Chinese]AP[みんなの囲碁]VW[]GN[みんなの囲碁]GC[]DT[2025-02-03 21:26:07]RE[W+58.5];B[pd];W[pp];B[dp];W[dd];B[fc];W[cf];B[db];W[cc];B[ic];W[qf];B[qe];W[pf];B[nd];W[pj];B[nq];W[qn];B[pr];W[qq];B[kq];W[cn];B[fq];W[dj];B[cl];W[dl]TL[1,0];B[cm];W[dm];B[bn];W[co];B[bo];W[cp];B[cq];W[bp];B[bq];W[ao];B[an];W[ap];B[bl];W[bj];B[dn];W[do];B[en];W[eo];B[fn];W[fo];B[go];W[gn];B[gm];W[hn];B[fm];W[gp];B[ho];W[fp];B[hp];W[gq]TL[1,0];B[eq];W[hq]TL[1,0];B[iq];W[ir];B[jr];W[ip];B[io];W[jq];B[jp];W[iq];B[jo];W[kr]TL[1,0];B[lr];W[js];B[lq];W[dr];B[dq];W[fr]TL[1,0];B[er];W[gr];B[cr];W[ar];B[aq];W[ds];B[es];W[bs];B[cs];W[ck];B[ek];W[dk];B[ej];W[ei]TL[1,0];B[fi];W[fh];B[eh];W[di];B[gh];W[fg];B[gj];W[gg];B[hh];W[hg]TL[1,0];B[ih];W[ig]TL[1,0];B[jh];W[lc];B[ld];W[kd];B[kc];W[md];B[le];W[me];B[mc];W[lb];B[mb];W[nc]TL[1,0];B[nb];W[oc];B[ob];W[lf]TL[1,0];B[ke];W[kf];B[jd];W[je];B[kd];W[od];B[pc];W[oe];B[rf];W[rg];B[re];W[qr];B[or];W[li]TL[1,0];B[kj];W[lj];B[kk];W[lk];B[ll];W[ml];B[lm];W[mm];B[mn];W[nn];B[mo];W[no];B[np];W[cb];B[dc];W[ed];B[fd];W[fe];B[ec];W[hd];B[hc];W[gd];B[gc];W[id];B[kb];W[ki];B[ji];W[kh];B[jg];W[jf];B[kg];W[lg];B[mf];W[ne];B[mg];W[mh];B[ng];W[nh];B[og];W[ph];B[pg];W[qg];B[oh];W[oi];B[qh];W[pi];B[rh];W[sg];B[sh];W[ri];B[qi];W[qj];B[pe];W[of];B[sf];W[el];B[fl];W[da];B[ea];W[ca];B[fb];W[op];B[oq];W[ls];B[ms];W[ks];B[qs];W[rs];B[ps];W[rr];B[fs];W[gs];B[ep];W[dr];B[pq];W[em])";
            // const sample = "(;FF[4]CA[UTF-8]GM[1]DT[2025-02-02]PC[OGS: https://online-go.com/game/71982392]GN[Дружеский матч]PB[BlackLion]PW[hisana15]BR[18k]WR[19k]TM[259200]OT[86400 fischer]RE[W+38.5]SZ[19]KM[6.5]RU[Japanese];B[pd];W[dp];B[dd];W[pp];B[qq];W[pq];B[qp];W[po];B[qc];W[jp];B[cc];W[jc];B[gc];W[mc];B[nc];W[hb];B[gb];W[nb];B[ob];W[nd];B[oc];W[mb];B[cq];W[dq];B[cp];W[do];B[co];W[je];B[dn];W[fo];B[em];W[jk];B[ci];W[ji];B[pg];W[qj];B[qi];W[pj];B[pi];W[oi];B[oh];W[ni];B[gi];W[gm];B[gf];W[gk];B[fk];W[gj];B[fj];W[ij];B[cf];W[he];B[ge];W[hd];B[gd];W[ib];B[nf];W[me];B[nh];W[mh];B[mg];W[lh];B[lg];W[kg];B[dr];W[er];B[cr];W[fq];B[qo];W[qn];B[rn];W[qm];B[rm];W[ql];B[rl];W[cm];B[cn];W[cj];B[dj];W[ck];B[bm];W[bl];B[am];W[bi];B[dm];W[ch];B[cl];W[di];B[dk];W[bk];B[ei];W[eh];B[fh];W[eg];B[ef];W[dg];B[df];W[cg];B[bg];W[bh];B[bf];W[fl];B[el];W[fn];B[fm];W[gl];B[ih];W[hi];B[hh];W[jh];B[ii];W[hj];B[hf];W[if];B[ig];W[jg];B[pr];W[or];B[ps];W[os];B[qr];W[ri];B[rh];W[rj];B[qh];W[oe];B[pe];W[of];B[og];W[pf];B[qf];W[ne];B[mf];W[lf];B[ng];W[ke];B[hr];W[jr];B[gq];W[gp];B[fr];W[fs];B[gs];W[gr];B[hs];W[hq];B[iq];W[ip];B[jq];W[kq];B[mr];W[mp];B[lr];W[kr];B[lq];W[lp];B[fg];W[nq];B[ds];W[es];B[hc];W[ic];B[si];W[sj];B[sh];W[rk];B[sl];W[ag];B[af];W[ah];B[na];W[ma];B[oa];W[ga];B[fa];W[ha];B[eb];W[al];B[od];W[oj];B[en];W[eo];B[];W[])";
            // const sample = "(;FF[4]CA[UTF-8]GM[1]DT[2025-01-24]PC[OGS: https://online-go.com/game/71691087]GN[hazbot vs. hisana15]PB[hazbot]PW[hisana15]BR[22k]WR[19k]TM[259200]OT[86400 fischer]RE[W+R]SZ[19]KM[0.5]RU[Japanese];B[dd];W[pp];B[qd];W[dp];B[di];W[jp];B[kd];W[pj];B[dn];W[fp];B[qq];W[pq];B[qp];W[qo];B[ro];W[qn];B[rn];W[qm];B[rm];W[qg];B[pf];W[jm];B[jk];W[hm];B[gm];W[hl];B[hk];W[gl];B[fm];W[nj];B[fk];W[lk];B[go];W[gp];B[hn];W[in];B[il];W[im];B[jl];W[lm];B[hp];W[le];B[lf];W[me];B[nd];W[nf];B[nh];W[oh];B[og];W[ng];B[mh];W[pg];B[of];W[lg];B[kf];W[lh];B[mf];W[mg];B[ne];W[mi];B[ld];W[fc];B[ec];W[ic];B[gc];W[gb];B[fd];W[fb];B[gd];W[kb];B[lb];W[hc];B[jc];W[jb];B[id];W[cd];B[cc];W[ce];B[df];W[bg];B[cf];W[bf];B[bi];W[bc];B[ae];W[cb];B[dc];W[da];B[db];W[ba];B[ea];W[ca];B[eb];W[ha];B[ab];W[ac];B[de];W[bd];B[hd];W[ia];B[fa];W[ka];B[cq];W[cp];B[dq];W[eq];B[er];W[fr];B[es];W[jh];B[jg];W[ig];B[kh];W[ni];B[ih];W[ji];B[if];W[hg];B[kg];W[ki];B[hi];W[bn];B[bm];W[cn];B[cm];W[bq];B[br];W[ap];B[ar];W[fs];B[cs];W[re];B[rd];W[qe];B[pe];W[qf];B[pd];W[lq];B[eo];W[ep];B[fo];W[hq];B[ip];W[iq];B[ql];W[rk];B[rl];W[om];B[qk];W[dr];B[cr];W[ds];B[rj];W[qj];B[ri];W[kc];B[jd];W[lc];B[md];W[mb];B[nb];W[mc];B[nc];W[ma];B[na];W[ii];B[hh];W[ij];B[ik];W[hj];B[gk];W[gj];B[fi];W[gi];B[gh];W[fj];B[gg];W[ei];B[fh];W[ek];B[fl];W[dh];B[ch];W[dj];B[ci];W[cg];B[eh];W[dg];B[ej];W[jf];B[je];W[ei];B[er];W[es];B[ej];W[ho];B[io];W[ei];B[km];W[jn];B[jo];W[kn];B[ko];W[ln];B[kp];W[ej];B[jq];W[ck];B[bk];W[dl];B[cj];W[dm];B[cl];W[dk];B[am];W[do];B[en];W[kq];B[jr];W[an];B[ak];W[mq];B[kl];W[ll];B[rg];W[qi];B[ol];W[pl];B[pk];W[pm];B[oj];W[oi];B[ok];W[lp];B[kr];W[lr];B[ir];W[hr])";
            // const sample = "(;GM[1]FF[4]SZ[19]GN[]DT[2025-02-01]PB[cafelatte]PW[coopter]BR[3谿ｵ]WR[3谿ｵ]KM[0]HA[0]RU[Japanese]AP[GNU Go:3.8]RE[B+1.50]TM[1200]TC[3]TT[30]RL[0];B[pd];W[pp];B[cd];W[dp];B[qn];W[pj];B[nq];W[np];B[mp];W[no];B[pq];W[qq];B[oq];W[qp];B[jq];W[mo];B[lp];W[qf];B[nc];W[rd];B[cn];W[dn];B[dm];W[en];B[co];W[cp];B[cj];W[em];B[dl];W[fq];B[qc];W[ec];B[de];W[hc];B[dc];W[nj];B[ed];W[kc];B[rc];W[of];B[pm];W[po];B[qj];W[qi];B[qk];W[ri];B[ro];W[ol];B[rp];W[rq];B[rm];W[pl];B[ql];W[di];B[ci];W[dg];B[cg];W[ch];B[bh];W[dh];B[cf];W[hr];B[fc];W[jr];B[kr];W[ir];B[iq];W[he];B[ff];W[fk];B[jn];W[ho];B[jl];W[le];B[ne];W[nf];B[me];W[mf];B[lf];W[lg];B[kf];W[ke];B[jf];W[hg];B[jh];W[hi];B[jj];W[ki];B[ji];W[kj];B[kk];W[lk];B[ll];W[mk];B[jd];W[je];B[ie];W[if];B[kh];W[id];B[lh];W[mi];B[mh];W[nh];B[bp];W[bq];B[bo];W[cr];B[lb];W[kb];B[mc];W[lc];B[mb];W[gb];B[fb];W[ks];B[lr];W[ik];B[jk];W[re];B[mm];W[om];B[rj];W[hm];B[hq];W[gq];B[el];W[fl];B[si];W[sh];B[sj];W[rg];B[do];W[eo];B[gc];W[hb];B[hl];W[il];B[dj];W[fi];B[lo];W[sc];B[sb];W[sd];B[ra];W[pr];B[or];W[qr];B[hp];W[gp];B[io];W[in];B[jo];W[mg];B[nm];W[pn];B[pe];W[pf];B[ej];W[fh];B[fj];W[gj];B[li];W[lj];B[pk];W[ok];B[ka];W[ja];B[la];W[oe];B[od];W[gf];B[fe];W[fg];B[ij];W[hj];B[jm];W[im];B[ls];W[js];B[ih];W[mn];B[ln];W[qm];B[sp];W[qo];B[rn];W[md];B[nd];W[ld];B[ps];W[qs];B[os];W[nn];B[ga];W[ha];B[fa];W[gd];B[fd];W[hh];B[ge];W[hd];B[ef];W[sq];B[ek];W[ml];B[nl];W[nk];B[lm];W[ap];B[ao];W[aq];B[op];W[oo];B[ig];W[kg];B[jg];W[pm];B[eg])";
            // const sample = "(;AP[MultiGo:4.2.4]SZ[19]MULTIGOGM[1]PB[趙治勲]BR[九段]PW[羽根直樹]WR[棋聖]DT[2004/09/23]RE[W+0.5]KM[6.5]TM[300]RU[Japanese]PC[]EV[第30期名人戦　最終予選]GC[228手完白半目勝ち];B[pd];W[dd];B[pq];W[dp];B[qo];W[kq];B[fc];W[cf];B[db];W[qf];B[nc];W[cc];B[qi];W[hc];B[ed];W[kc];B[qe];W[nq];B[cn];W[fp];B[bp];W[cq];B[ck];W[pf];B[ld];W[lc];B[mc];W[je];B[nh];W[nf];B[kf];W[mg];B[jf];W[mh];B[ie];W[gd];B[de];W[ce];B[dc];W[cd];B[fe];W[kd];B[ke];W[jd];B[hf];W[gb];B[id];W[ic];B[mb];W[ig];B[if];W[md];B[le];W[kb];B[ni];W[lj];B[mk];W[kh];B[lk];W[mj];B[nj];W[kk];B[kl];W[jl];B[km];W[ci];B[fb];W[no];B[on];W[mm];B[nm];W[pr];B[qq];W[jk];B[kp];W[jq];B[mp];W[lp];B[mq];W[mo];B[lq];W[lo];B[np];W[oo];B[op];W[nl];B[ol];W[nk];B[ok];W[ml];B[po];W[nn];B[om];W[jp];B[en];W[fn];B[fm];W[gn];B[eo];W[bq];B[gm];W[hm];B[hl];W[im];B[re];W[od];B[oc];W[rf];B[rh];W[ga];B[eg];W[kr];B[lr];W[pe];B[qd];W[bo];B[co];W[cp];B[bn];W[ap];B[bi];W[bh];B[bj];W[dh];B[cb];W[bb];B[ba];W[ab];B[fk];W[nd];B[jh];W[ih];B[ll];W[kn];B[ki];W[lh];B[jg];W[ii];B[ji];W[ij];B[eh];W[ph];B[pi];W[ei];B[gh];W[pc];B[qc];W[pb];B[ob];W[dk];B[dl];W[ek];B[el];W[qb];B[rb];W[rc];B[sd];W[cj];B[bl];W[fj];B[ah];W[ag];B[ai];W[cg];B[gc];W[hd];B[fa];W[ib];B[df];W[gk];B[gl];W[fh];B[fg];W[gi];B[hh];W[hg];B[gg];W[qh];B[ep];W[eq];B[rg];W[sg];B[pa];W[qg];B[ri];W[ge];B[gf];W[og];B[me];W[ne];B[fo];W[go];B[ks];W[js];B[ls];W[fl];B[hi];W[do];B[dn];W[fk];B[fi];W[gj];B[il];W[oh];B[bc];W[bd];B[an];W[ao];B[jo];W[io];B[la];W[oi];B[oj];W[sf];B[sh];W[se];B[qa];W[ka];B[lb];W[dg];B[jm];W[in];B[ik];W[hj];B[kj];W[jj];B[fh];W[jn])";
    
            const parsed = sgf.parse(sample);
            self.exit("GameScene", {kifu: parsed});
        };

    }
});

phina.define('GameScene', {
    superClass: 'DisplayScene',
    init: function(param/*{sgf:string}*/) {
        this.superInit(param);

        const self = this;

        // this.backgroundColor = "#34495e";
        this.backgroundColor = "white";

        // 定数 --------------------------
        const BOARD_SIZE = 19;
        const SPACE = 0;
        const BLACK = 1;
        const WHITE = 2;
        const OUT = 3;

        // 変数 --------------------------
        let move = 1;   // 手数
        let black_prisoner = 0; // 黒アゲハマ
        let white_prisoner = 0; // 白アゲハマ
        let checkBoard = Array(BOARD_SIZE + 2); // 合法手かどうか調べるのに使う
        let nextColor = BLACK;


        self.baseLayer = RectangleShape({
            fill: "transparent",
            strokeWidth: 0,
            width: this.width,
            height: this.height,
        }).addChildTo(this).setPosition(0, 0);

        createGoban(BOARD_SIZE);

        // createTapArea();


        // 碁盤
        let board = [];

        initBoard();

        /*------------------------------------------------------------------*/
        /* 座標(x,y)のcolor石を碁盤から取り除き、取った石の数を返す         */
        /*------------------------------------------------------------------*/
        function doRemoveStone(color, x, y, prisoner) {

            /* 取り除かれる石と同じ色ならば石を取る */
            if (board[y][x] === color) {

                /* 取った石の数を１つ増やす */
                prisoner++;

                /* その座標に空点を置く */
                board[y][x] = SPACE;

                /* 左を調べる */
                if( x > 1 ){
                    prisoner = doRemoveStone( color, x-1, y, prisoner );
                }
                /* 上を調べる */
                if( y > 1 ){
                    prisoner = doRemoveStone( color, x, y-1, prisoner );
                }
                /* 右を調べる */
                if( x < (BOARD_SIZE) ){
                    prisoner = doRemoveStone( color, x+1, y, prisoner );
                }
                /* 下を調べる */
                if( y < (BOARD_SIZE) ){
                    prisoner = doRemoveStone( color, x, y+1, prisoner );
                }
            }

            /* 取った石の数を返す */
            return prisoner;
        }

        /*------------------------------------------------------------------*/
        /* チェック用の碁盤をクリア                                         */
        /*------------------------------------------------------------------*/
        function clearCheckBoard() {

            let x, y;

            for( y = 1; y < (BOARD_SIZE + 2 - 1); y++ ) {
                checkBoard[y] = [];
                for( x = 1; x < (BOARD_SIZE + 2 - 1); x++ ) {
                    checkBoard[y][x] = false;
                }
            }
        }        

        /*------------------------------------------------------------------*/
        /* 座標(x,y)にあるcolor石が相手に囲まれているか調べる               */
        /* 空点があればFALSEを返し、空点がなければTRUEを返す */
        /*------------------------------------------------------------------*/
        function doCheckRemoveStone(color,x,y )
        {
            let rtn;

            /* その場所は既に調べた点ならおしまい */  
            if( checkBoard[y][x] === true ){
                return true;
            }
            
            /* 調べたことをマークする */
            checkBoard[y][x] = true;

            /* 何も置かれていないならばおしまい */
            if( board[y][x] === SPACE ){
                return false;
            }

            /* 同じ色の石ならばその石の隣も調べる */  
            if( board[y][x] === color ){

                /* その石の左(x-1,y)を調べる */
                if ( x > 1 ) {
                    rtn = doCheckRemoveStone( color, x-1, y );
                    if( rtn === false ){
                        return false;
                    }
                }

                /* その石の上(x,y-1)を調べる */
                if ( y > 1 ){
                    rtn = doCheckRemoveStone( color, x, y-1 );
                    if( rtn === false ){
                        return false;
                    }
                }

                /* その石の右(x+1,y)を調べる */
                if ( x < (BOARD_SIZE) ){
                    rtn = doCheckRemoveStone( color, x+1, y );
                    if( rtn === false ){
                        return false;
                    }
                }

                /* その石の下(x,y+1)を調べる */
                if ( y < (BOARD_SIZE) ){
                    rtn = doCheckRemoveStone( color, x, y+1 );
                    if( rtn === false ){
                        return false;
                    }
                }
            }

            /* 相手の色の石があった */  
            return true;
        }

        /*------------------------------------------------------------------*/
        /* 座標(x,y)の石が死んでいれば碁盤から取り除く                      */
        /*------------------------------------------------------------------*/
        function removeStone(color, x, y)
        {

            let prisoner;  /* 取り除かれた石数 */

            /* 置いた石と同じ色なら取らない */
            if( board[y][x] === color ){
                return 0;
            }

            /* 空点なら取らない */
            if( board[y][x] === SPACE ){
                return 0;
            }

            /* マークのクリア */
            clearCheckBoard();

            /* 囲まれているなら取る */
            if (doCheckRemoveStone(board[y][x], x, y) === true) {
                prisoner = doRemoveStone(board[y][x], x, y, 0);
                return prisoner;
            }

            return 0;
        }

        // 碁盤に石を置く
        function setStone(color, x, y) {

            // 取った相手の石の数
            let removedStonesCnt = 0;

            /* 座標(x,y)に石を置く */
            board[y][x] = color;

            /* 置いた石の周囲の相手の石が死んでいれば碁盤から取り除く */
            if (y > 1) {
                removedStonesCnt = removeStone(color, x, y - 1);
            }
            if (x > 1) {
                removedStonesCnt += removeStone(color, x - 1, y);
            }
            if (y < BOARD_SIZE) {
                removedStonesCnt += removeStone(color, x, y + 1) ;
            }
            if (x < BOARD_SIZE) {
                removedStonesCnt += removeStone(color, x + 1, y) ;
            }

            return removedStonesCnt;

        }

        // 碁盤を初期化
        function initBoard() {
            for (let y = 0; y < BOARD_SIZE + 2; y++) {
                board[y] = [];
                for (let x = 0; x < BOARD_SIZE + 2; x++) {
                    board[y][x] = SPACE;
                }
            }
            for (let y = 0; y < BOARD_SIZE + 2; y++) {
                board[y][0] = OUT;
                board[y][BOARD_SIZE + 2 - 1] = OUT;
                board[0][y] = OUT;
                board[BOARD_SIZE + 2 - 1][y] = OUT;
            }
        }

        // 盤面を表示する
        function drawAllStones(lastX, lastY) {

            self.banLayer.children.clear();

            for (let y = 1; y < BOARD_SIZE + 1; y++) {
                for (let x = 1; x < BOARD_SIZE + 1; x++) {
                    if (board[y][x] === BLACK) {
                        drawStone("black", x - 1, y - 1, true);
                    } else if (board[y][x] === WHITE) {
                        drawStone("white", x - 1, y - 1, true);
                    }
                }
            }

            const floor = Math.floor(self.banLayer.size / 2);

            CircleShape({
                fill: "red",
                radius: 8,
                stroke: "black",
                strokeWidth: 2,
            })
            .addChildTo(self.banLayer)
            .setPosition(self.banLayer.grid.span(lastX - floor), self.banLayer.grid.span(lastY - floor));
        }

        // 碁盤を描画
        function createGoban(size) {

            // 外枠
            self.ban = RectangleShape({
                // fill: "Peru",
                fill: "white",
                width: 630,
                height: 630,
                stroke: "black",
                // strokeWidth: 1,
                strokeWidth: 0,
            }).addChildTo(self.baseLayer).setPosition(self.gridX.center(), self.gridY.center(-2.65));
            const grid = Grid({width: self.ban.width - ((19 - size) * 6 + 50), columns: size - 1});

            const floor = Math.floor(size / 2);
            (size).times(function(spanX) {
                var startPoint = Vector2((spanX - floor) * grid.unitWidth, -1 * grid.width / 2),
                    endPoint = Vector2((spanX - floor) * grid.unitWidth, grid.width / 2);
        
                let strokeWidth = size === 9 ? 2 : 1;
                if (spanX === 0 || spanX === size - 1) {
                    strokeWidth = strokeWidth * 2;
                }
                PathShape({paths:[startPoint, endPoint], stroke: "black", strokeWidth: strokeWidth}).addChildTo(self.ban);
            });
        
            (size).times(function(spanY) {
                var startPoint = Vector2(-1 * grid.width / 2, (spanY - floor) * grid.unitWidth),
                    endPoint = Vector2(grid.width / 2, (spanY - floor) * grid.unitWidth);
                
                let strokeWidth = size === 9 ? 2 : 1;
                if (spanY === 0 || spanY === size - 1) {
                    strokeWidth = strokeWidth * 2;
                }
                PathShape({paths:[startPoint, endPoint], stroke: "black", strokeWidth: strokeWidth}).addChildTo(self.ban);
            });

            if (size === 9) {
                addStar(2, 2);
                addStar(6, 2);
                addStar(4, 4);
                addStar(2, 6);
                addStar(6, 6);
            } else if (size === 13) {
                addStar(3, 3);
                addStar(9, 3);
                addStar(6, 6);
                addStar(3, 9);
                addStar(9, 9);
            } else if (size === 19) {
                addStar(3, 3);
                addStar(9, 3);
                addStar(15, 3);
                addStar(3, 9);
                addStar(9, 9);
                addStar(15, 9);
                addStar(3, 15);
                addStar(9, 15);
                addStar(15, 15);
            }

            function addStar(spanX, spanY) {
                CircleShape({
                    radius: 3,
                    fill: "black",
                    strokeWidth: 0,
                }).addChildTo(self.ban).setPosition((spanX - floor) * grid.unitWidth, (spanY - floor) * grid.unitWidth);
            }

            self.banLayer = RectangleShape({
                fill: "transparent",
                strokeWidth: 0,
                width: self.ban.width,
                height: self.ban.height,
            }).addChildTo(self.ban).setPosition(0, 0);

            self.banLayer.size = size;
            self.banLayer.grid = grid;

            self.tapLayer = RectangleShape({
                fill: "transparent",
                strokeWidth: 0,
                width: self.ban.width,
                height: self.ban.height,
            }).addChildTo(self.ban).setPosition(0, 0);

            return;
        }

        // 石を置くタップ領域を作成
        // function createTapArea() {
        //     const size = self.banLayer.size;
        //     const floor = Math.floor(size / 2);

        //     for (let y = 0; y < size; y++) {
        //         for (let x = 0; x < size; x++) {
        //             const area = CircleShape({
        //                 fill: "transparent",
        //                 radius: self.banLayer.grid.unitWidth / 2 - 2,
        //                 strokeWidth: 0,
        //             });
        //             area.addChildTo(self.tapLayer).setPosition(self.banLayer.grid.span(x - floor), self.banLayer.grid.span(y - floor));
        //             area.setInteractive(true);
        //             area.on("pointstart", () => {
        //                 const xx = x + 1;
        //                 const yy = y + 1;

        //                 setStone(nextColor, xx, yy);
        //                 drawAllStones();
        //                 nextColor = nextColor === BLACK ? WHITE : BLACK;
        //                 move += 1;
        //             });
        //         }
        //     }
        // }

        // 石を描画
        function drawStone(color, x, y, show) {
            const floor = Math.floor(self.banLayer.size / 2);

            // let grad;

            // if (color === "black") {
            //     if (self.banLayer.size === 13) {
            //         grad = Canvas.createRadialGradient(-10, -10, 0, -5, -5, 10);
            //     } else if (self.banLayer.size === 19) {
            //         grad = Canvas.createRadialGradient(-5, -5, 0, -5, -5, 5);
            //     } else {
            //         grad = Canvas.createRadialGradient(-15, -15, 0, -10, -10, 15);
            //     }
            //     grad.addColorStop(0.2, "rgb(80, 80, 80)");
            //     grad.addColorStop(1, "rgb(0, 0, 0)");
            // } else {
            //     if (self.banLayer.size === 13) {
            //         grad = Canvas.createRadialGradient(-10, -10, 0, -5, -5, 25);
            //     } else if (self.banLayer.size === 19) {
            //         grad = Canvas.createRadialGradient(-5, -5, 0, -5, -5, 20);
            //     } else {
            //         grad = Canvas.createRadialGradient(-15, -15, 0, -10, -10, 40);
            //     }
            //     grad.addColorStop(0.1, "rgb(255, 255, 255)");
            //     grad.addColorStop(0.95, "rgb(150, 150, 150)");
            //     grad.addColorStop(1, "rgb(130, 130, 130)");
            // }
            const stone = CircleShape({
                // fill: grad,
                fill: color,
                radius: self.banLayer.grid.unitWidth / 2 - 2,
                // strokeWidth: 0,
                // shadow: color === "white" ? "black" : "transparent",
                // shadowBlur: 3,
                strokeWidth: 3,
                stroke: "black",
            });
            stone.addChildTo(self.banLayer).setPosition(self.banLayer.grid.span(x - floor), self.banLayer.grid.span(y - floor));
        };


        const kifu = param.kifu;

        const boards = [];  // {board: board, lastX: x, lastY: y}

        const gukeiList = [];

        createBoards();

        move = 0;
        board = boards[move].board;
        drawAllStones(boards[move].lastX, boards[move].lastY);

        function createBoards() {
            // 置き石
            if (kifu.props.AB) {
                kifu.props.AB.forEach(pos => {
                    const x = alphabetToPoint(pos.split("")[0]);
                    const y = alphabetToPoint(pos.split("")[1]);
                    board[y][x] = BLACK;                    
                });
            }
            while (true) {
                let parent = kifu;
                let child;
                for (let i = 0; i < move; i++) {
                    child = parent.childs[0];
                    parent = child;
                }
    
                if (!child) break;
    
                const props = child.props;
                let color = null, pos;
                if (props.W) {
                    color = WHITE;
                    pos = props.W.split("");
                } else if (props.B) {
                    color = BLACK;
                    pos = props.B.split("");
                }
                if (color !== null) {
                    const x = alphabetToPoint(pos[0]);
                    const y = alphabetToPoint(pos[1]);
                    if (x <= BOARD_SIZE && y <= BOARD_SIZE) {
                        const removedStonesCnt = setStone(color, x, y);
                        boards.push({
                            board: JSON.parse(JSON.stringify(board)),
                            lastX: x - 1,
                            lastY: y - 1,
                        });
                        gukeiCheck(x, y, removedStonesCnt);
                    }
                }
                move += 1;

                // @@@@ 100手まで
                // if (move > 100) break;
    
            }
            function alphabetToPoint(char) {
                const alphabet = "abcdefghijklmnopqrstuvwxyz";
                return alphabet.indexOf(char) + 1;
            }
        }

        function gukeiCheck(lastX, lastY, removedStonesCnt) {

            const color = board[lastY][lastX];

            function isAkisankaku(color, x, y) {

                // 三角の形になっているか
                function isTriangle(color, x, y) {

                    function isEmptyTriangle(color, a, b, c) {
                        const list = [a, b, c];
                        const stoneCount = list.reduce((a, b) => {
                            if (board[b.y][b.x] === color) return a + 1;
                            return a;
                        }, 0);
                        const spaceCount = list.reduce((a, b) => {
                            if (board[b.y][b.x] === SPACE) return a + 1;
                            return a;
                        }, 0);

                        return stoneCount === 2 && spaceCount === 1;
                    }

                    return isEmptyTriangle(color, {x: x - 1, y: y - 1}, {x: x, y: y - 1}, {x: x - 1, y: y})
                        || isEmptyTriangle(color, {x: x, y: y - 1}, {x: x + 1, y: y - 1}, {x: x + 1, y: y})
                        || isEmptyTriangle(color, {x: x + 1, y: y}, {x: x + 1, y: y + 1}, {x: x, y: y + 1})
                        || isEmptyTriangle(color, {x: x, y: y + 1}, {x: x - 1, y: y + 1}, {x: x - 1, y: y});
                    
                }

                // アタリから逃げた手か
                function isEscape(color, x, y) {
                    const boardCopy = JSON.parse(JSON.stringify(board));
                    board[y][x] = SPACE;
                    const ememyColor = color === WHITE ? BLACK : WHITE;
                    const agehama = setStone(ememyColor, x, y);
                    board = JSON.parse(JSON.stringify(boardCopy));
                    return agehama !== 0;
                }

                // キリを防ぐ手か
                function isDefendFromKiri(color, x, y) {
                    const ememyColor = color === WHITE ? BLACK : WHITE;
                    // 左上
                    if (board[y - 1][x - 1] === ememyColor && board[y][x - 1] === color && board[y - 1][x] === color) {
                        return true;
                    }
                    // 右上
                    if (board[y + 1][x - 1] === ememyColor && board[y][x - 1] === color && board[y + 1][x] === color) {
                        return true;
                    }
                    // 左下
                    if (board[y - 1][x + 1] === ememyColor && board[y][x + 1] === color && board[y - 1][x] === color) {
                        return true;
                    }
                    // 右下
                    if (board[y + 1][x + 1] === ememyColor && board[y][x + 1] === color && board[y + 1][x] === color) {
                        return true;
                    }
                    return false;
                }

                // ノゾキにツグ手か
                function isDefendNozoki(color, x, y) {
                    const ememyColor = color === WHITE ? BLACK : WHITE;
                    // 横方向からのノゾキ
                    if (board[y - 1][x] === color && board[y + 1][x] === color) {
                        // ノゾかれているか
                        if (board[y][x - 1] === ememyColor || board[y][x + 1] === ememyColor) {
                            return true;
                        }
                    }
                    // 縦方向からのノゾキ
                    if (board[y][x - 1] === color && board[y][x + 1] === color) {
                        // ノゾかれているか
                        if (board[y - 1][x] === ememyColor || board[y + 1][x] === ememyColor) {
                            return true;
                        }
                    }
                    return false;
                }

                // アキ三角
                // 二線以下に打った場合はヨセかもしれないのでアキ三角とはみなさない
                if (lastX > 2 && lastX < 18 && lastY > 2 && lastY < 18) {
                    // 三角の形になっていないなら違う
                    if (!isTriangle(color, lastX, lastY)) {
                        return false;
                    }
                    // 石を取るための手はしかたがない
                    if (removedStonesCnt > 0) {
                        return false;
                    }
                    // アタリから逃げた手はしかたがない
                    if (isEscape(color, lastX, lastY)) {
                        return false;
                    }
                    // キリチガイを防ぐ手はしかたがない
                    if (isDefendFromKiri(color, lastX, lastY)) {
                        return false;
                    }
                    // ノゾキにツグ手はしかたがない
                    if (isDefendNozoki(color, lastX, lastY)) {
                        return false;
                    }

                    return true;
                }

                return false;
                
            }

            function isNimokuNoAtama(color, x, y) {
                const ememyColor = color === WHITE ? BLACK : WHITE;


                // 第四線以下は無視
                if (x < 3 || x > 17 || y < 3 || y > 17) {
                    return false;
                }

                // パターン１
                //  WW
                // WBBW

                // (1)
                //  WW
                // *BBW
                //  SS
                if (   board[y - 1][x + 1] === color      && board[y - 1][x + 2] === color
                    && board[y    ][x + 1] === ememyColor && board[y    ][x + 2] === ememyColor && board[y    ][x + 3] === color
                    && board[y + 1][x + 1] === SPACE      && board[y + 1][x + 2] === SPACE) {
                    return true;
                }

                // (2)
                //  *W
                // WBBW
                //  SS
                if (                                                                          board[y    ][x + 1] === color
                    && board[y + 1][x - 1] === color && board[y + 1][x    ] === ememyColor && board[y + 1][x + 1] === ememyColor && board[y + 1][x + 2] === color
                                                     && board[y + 2][x    ] === SPACE      && board[y + 2][x + 1] === SPACE) {
                    return true;
                }

                // (3)
                //  W*
                // WBBW
                //  SS
                if (                                    board[y    ][x - 1] === color
                    && board[y + 1][x - 2] === color && board[y + 1][x - 1] === ememyColor && board[y + 1][x    ] === ememyColor && board[y + 1][x + 1] === color
                                                     && board[y + 2][x - 1] === SPACE      && board[y + 2][x    ] === SPACE) {
                    return true;
                }

                // (4)
                //  WW
                // WBB*
                //  SS
                if (                                    board[y - 1][x - 2] === color      && board[y - 1][x - 1] === color
                    && board[y    ][x - 3] === color && board[y    ][x - 2] === ememyColor && board[y    ][x - 1] === ememyColor
                                                     && board[y + 1][x - 2] === SPACE      && board[y + 1][x - 1] === SPACE) {
                    return true;
                }

                // パターン２
                // WBBW
                //  WW

                // (1)
                //  SS
                // *BBW
                //  WW
                if (   board[y - 1][x + 1] === SPACE      && board[y - 1][x + 2] === SPACE
                    && board[y    ][x + 1] === ememyColor && board[y    ][x + 2] === ememyColor && board[y    ][x + 3] === color
                    && board[y + 1][x + 1] === color      && board[y + 1][x + 2] === color) {
                    return true;
                }

                // (2)
                //  SS
                // WBBW
                //  *W
                if (                                    board[y - 2][x] === SPACE      && board[y - 2][x + 1] === SPACE
                    && board[y - 1][x - 1] === color && board[y - 1][x] === ememyColor && board[y - 1][x + 1] === ememyColor && board[y - 1][x + 2] === color
                                                                                       && board[y    ][x + 1] === color) {
                    return true;
                }

                // (3)
                //  SS
                // WBBW
                //  W*
                if (                                    board[y - 2][x - 1] === SPACE      && board[y - 2][x] === SPACE
                    && board[y - 1][x - 2] === color && board[y - 1][x - 1] === ememyColor && board[y - 1][x] === ememyColor && board[y - 1][x + 1] === color
                                                     && board[y    ][x - 1] === color) {
                    return true;
                }

                // (4)
                //  SS
                // WBB*
                //  WW
                if (                                    board[y - 1][x - 2] === SPACE      && board[y - 1][x - 1] === SPACE
                    && board[y    ][x - 3] === color && board[y    ][x - 2] === ememyColor && board[y    ][x - 1] === ememyColor
                                                     && board[y + 1][x - 2] === color      && board[y + 1][x - 1] === color) {
                    return true;
                }

                // パターン３
                //  W
                //  BW
                //  BW
                //  W

                // (1)
                //  *
                // SBW
                // SBW
                //  W
                if (   board[y + 1][x - 1] === SPACE && board[y + 1][x    ] === ememyColor && board[y + 1][x + 1] === color
                    && board[y + 2][x - 1] === SPACE && board[y + 2][x    ] === ememyColor && board[y + 2][x + 1] === color
                                                     && board[y + 3][x    ] === color) {
                    return true;
                }

                // (2)
                //  W
                // SB*
                // SBW
                //  W
                if (                                    board[y - 1][x - 1] === color
                    && board[y    ][x - 2] === SPACE && board[y    ][x - 1] === ememyColor
                    && board[y + 1][x - 2] === SPACE && board[y + 1][x - 1] === ememyColor && board[y + 1][x] === color
                                                     && board[y + 2][x - 1] === color) {
                    return true;
                }

                // (3)
                //  W
                // SBW
                // SB*
                //  W
                if (                                    board[y - 2][x - 1] === color
                    && board[y - 1][x - 2] === SPACE && board[y - 1][x - 1] === ememyColor && board[y - 1][x    ] === color
                    && board[y    ][x - 2] === SPACE && board[y    ][x - 1] === ememyColor
                                                     && board[y + 1][x - 1] === color) {
                    return true;
                }

                // (4)
                //  W
                // SBW
                // SBW
                //  *
                if (                                    board[y - 3][x] === color
                    && board[y - 2][x - 1] === SPACE && board[y - 2][x] === ememyColor && board[y - 2][x + 1] === color
                    && board[y - 1][x - 1] === SPACE && board[y - 1][x] === ememyColor && board[y - 1][x + 1] === color) {
                    return true;
                }

                // パターン４
                //  W
                // WB
                // WB
                //  W

                // (1)
                //  *
                // WBS
                // WBS
                //  W
                if (   board[y + 1][x - 1] === color && board[y + 1][x] === ememyColor && board[y + 1][x + 1] === SPACE
                    && board[y + 2][x - 1] === color && board[y + 2][x] === ememyColor && board[y + 2][x + 1] === SPACE
                                                     && board[y + 3][x] === color) {
                    return true;
                }

                // (2)
                //  W
                // *BS
                // WBS
                //  W
                if (                                board[y - 1][x + 1] === color
                                                 && board[y    ][x + 1] === ememyColor && board[y    ][x + 2] === SPACE
                    && board[y + 1][x] === color && board[y + 1][x + 1] === ememyColor && board[y + 1][x + 2] === SPACE
                                                 && board[y + 2][x + 1] === color) {
                    return true;
                }

                // (3)
                //  W
                // WBS
                // *BS
                //  W
                if (                                board[y - 2][x + 1] === color
                    && board[y - 1][x] === color && board[y - 1][x + 1] === ememyColor && board[y - 1][x + 2] === SPACE
                                                 && board[y    ][x + 1] === ememyColor && board[y    ][x + 2] === SPACE
                                                 && board[y + 1][x + 1] === color) {
                    return true;
                }

                // (4)
                //  W
                // WBS
                // WBS
                //  *
                if (                                    board[y - 3][x] === color
                    && board[y - 2][x - 1] === color && board[y - 2][x] === ememyColor && board[y - 2][x + 1] === SPACE
                    && board[y - 1][x - 1] === color && board[y - 1][x] === ememyColor && board[y - 1][x + 1] === SPACE) {
                    return true;
                }

                return false;
            }

            function isSakare(color, x, y) {

                // 第五線以上は無視
                if ((x > 4 && x < 16) && (y > 4 && y < 16)) {
                    return false;
                }

                const ememyColor = color === WHITE ? BLACK : WHITE;

                // パターン１
                //  W
                // BWB
                //  W

                // (1)
                //  ?
                //  *
                // BWB
                //  W
                //  ?
                if (board[y + 2] !== undefined && board[y + 3] !== undefined) {
                if (board[y + 1][x - 1] === ememyColor && board[y + 1][x] === color && board[y + 1][x + 1] === ememyColor
                                                       && board[y + 2][x] === color) {
                    // ?の位置に相手の石が無いこと
                    if (board[y - 1][x] !== ememyColor
                        && board[y + 3][x] !== ememyColor) {

                        // 第１線でハネツギしただけの場合は違う
                        if (!(y === 1 && (board[y][x - 1] === color || board[y][x + 1] === color))) {
                            console.log("1-1");
                            return true;
                        }
                    }
                }
                }

                // (2)
                //  ?
                //  W
                // B*B
                //  W
                //  ?
                if (board[y + 2] !== undefined && board[y + 3] !== undefined) {
                if (                                   board[y - 1][x] === color
                    && board[y][x - 1] === ememyColor                            && board[y][x + 1] === ememyColor
                                                    && board[y + 1][x] === color) {
                    // ?の位置に相手の石が無いこと
                    if (board[y - 2][x] !== ememyColor
                        && board[y + 2][x] !== ememyColor) {
                        console.log("1-2");
                        return true;
                    }
                }
                }

                // (3)
                //  ?
                //  W
                // BWB
                //  *
                //  ?
                if (board[y - 2] !== undefined && board[y - 3] !== undefined) {
                if (                                          board[y - 2][x] === color
                    && board[y - 1][x - 1] === ememyColor  && board[y - 1][x] === color && board[y - 1][x + 1] === ememyColor) {
                    // ?の位置に相手の石が無いこと
                    if (board[y - 3][x] !== ememyColor
                        && board[y + 1][x] !== ememyColor) {

                        // 第１線でハネツギしただけの場合は違う
                        if (!(y === 19 && (board[y][x - 1] === color || board[y][x + 1] === color))) {
                            console.log("1-3");
                            return true;
                        }

                    }
                }
                }

                // パターン２
                //  BW
                //   WB

                // (1)
                //   ?
                //  B*?
                //  ?WB
                //   ?
                if (board[y][x - 1] === ememyColor
                                                    && board[y + 1][x] === color && board[y + 1][x + 1] === ememyColor) {
                    // ?の位置に相手の石が無いこと
                    if (board[y - 1][x] !== ememyColor
                        && board[y][x + 1] !== ememyColor
                        && board[y + 1][x - 1] !== ememyColor
                        && board[y + 2][x] !== ememyColor) {

                        // 第１線でハネツギしただけの場合は違う
                        if (!(y === 1 && (board[y][x - 1] === color || board[y][x + 1] === color))) {
                            console.log("2-1");
                            return true;
                        }
                    }
                }

                // (2)
                //   ?
                //  BW?
                //  ?*B
                //   ?
                if (board[y - 1][x - 1] === ememyColor && board[y - 1][x] === color
                                                                                    && board[y][x + 1] === ememyColor) {
                    // ?の位置に相手の石が無いこと
                    if (board[y - 2][x] !== ememyColor
                        && board[y - 1][x + 1] !== ememyColor
                        && board[y][x - 1] !== ememyColor
                        && board[y + 1][x] !== ememyColor) {

                        // 第１線でハネツギしただけの場合は違う
                        if (!(y === 19 && (board[y][x - 1] === color || board[y][x + 1] === color))) {
                            console.log("2-2");
                            return true;
                        }
                    }
                }

                // パターン３
                //  B
                // WWW
                //  B

                // (1)
                //  B
                // *WW?
                //  B
                if (   board[y - 1][x + 1] === ememyColor
                    && board[y    ][x + 1] === color       && board[y][x + 2] === color
                    && board[y + 1][x + 1] === ememyColor) {
                    // ?の位置に相手の石が無いこと
                    if (board[y][x + 3] !== ememyColor) {

                        // 第１線でハネツギしただけの場合は違う
                        if (!(x === 1 && (board[y - 1][x] === color || board[y + 1][x] === color))) {
                            console.log("3-1");
                            return true;
                        }
                    }
                }

                // (2)
                //  B
                // W*W
                //  B
                if (                                 board[y - 1][x] === ememyColor
                    && board[y][x - 1] === color                                        && board[y][x + 1] === color
                                                  && board[y + 1][x] === ememyColor) {

                    console.log("3-2");
                }

                // (3)
                //   B
                // ?WW*?
                //   B
                if (                                board[y - 1][x - 1] === ememyColor
                    && board[y][x - 2] === color && board[y    ][x - 1] === color
                                                 && board[y + 1][x - 1] === ememyColor) {
                    // ?の位置に相手の石が無いこと
                    if (board[y][x - 3] !== ememyColor && board[y][x + 1] !== ememyColor) {
 
                         // 第１線でハネツギしただけの場合は違う
                         if (!(x === 19 && (board[y - 1][x] === color || board[y + 1][x] === color))) {
                            console.log("3-3");
                            return true;
                        }
                    }
                }

                // パターン４
                // B
                // WW
                //  B

                // (1)
                //  B?
                // ?*W?
                //  ?B
                if (board[y - 1][x] === ememyColor
                                                    && board[y    ][x + 1] === color
                                                    && board[y + 1][x + 1] === ememyColor) {
                    // ?の位置に相手の石が無いこと
                    if (board[y - 1][x + 1] !== ememyColor
                        && board[y][x - 1] !== ememyColor
                        && board[y][x + 2] !== ememyColor
                        && board[y + 1][x] !== ememyColor) {

                        // 第１線でハネツギしただけの場合は違う
                        if (!(x === 1 && (board[y - 1][x] === color || board[y + 1][x] === color))) {
                            console.log("4-1");
                            return true;
                        }
                    }
                }

                // (2)
                //  B?
                // ?W*?
                //  ?B
                if (   board[y - 1][x - 1] === ememyColor
                    && board[y    ][x - 1] === color
                                                           && board[y + 1][x] === ememyColor) {
                    // ?の位置に相手の石が無いこと
                    if (board[y - 1][x] !== ememyColor
                        && board[y][x - 2] !== ememyColor
                        && board[y][x + 1] !== ememyColor
                        && board[y + 1][x - 1] !== ememyColor) {

                        // 第１線でハネツギしただけの場合は違う
                        if (!(x === 19 && (board[y - 1][x] === color || board[y + 1][x] === color))) {
                            console.log("4-2");
                            return true;
                        }
                    }
                }

                return false;
            }


            if (isSakare(color, lastX, lastY)) {
                gukeiList.push({
                    title: "サカレ形…？",
                    move: move,
                    fontFamily: "sans-serif",
                    fontSize: 100,
                });
                return;
            }

            if (isNimokuNoAtama(color, lastX, lastY)) {
                gukeiList.push({
                    title: "二目の頭",
                    move: move,
                    fontFamily: "sans-serif",
                    fontSize: 140,
                });
                return;
            }

            if (isAkisankaku(color, lastX, lastY)) {
                gukeiList.push({
                    title: "アキ三角",
                    move: move,
                    fontFamily: "sans-serif",
                    fontSize: 130,
                });
                return;
            }

            gukeiList.push(null);
        }

        // 画面下パネル
        RectangleShape({
            fill: "white",
            width: this.width,
            height: this.height - self.banLayer.height,
            strokeWidth: 0,
        }).addChildTo(this).setPosition(this.gridX.center(), this.height / 2 + self.banLayer.height / 2);

        function controlButtons() {

            gukeiNextButton.hide();
            // gukeiBackButton.hide();
            backButton.hide();
            forwardButton.hide();

            if (move > 0) {
                // gukeiBackButton.show();
                backButton.show();
            }

            if (move < boards.length - 1) {
                forwardButton.show();
            }

            for (let i = move + 1; i < gukeiList.length; i++) {
                if (gukeiList[i] !== null) {
                    gukeiNextButton.show();
                    break;
                }
            }
        }

        const gukeiNextButton = MyButton({
            text: "次の愚形",
            width: 180,
            height: 100,
            fill: "white",
            fontColor: "black",
            stroke: "black",
            strokeWidth: 5,
        }).addChildTo(this).setPosition(this.gridX.center(5.3), this.gridY.center(3.7));
        gukeiNextButton.selected = function() {
            if (move === boards.length - 1) {
                return;
            }

            for (let i = move + 1; i < gukeiList.length; i++) {
                if (gukeiList[i] !== null) {
                    const m = gukeiList[i].move - 1;
                    board = boards[m].board;
                    drawAllStones(boards[m].lastX, boards[m].lastY);
                    move = m;
                    break;
                }
            }
            updateGukeiLabel();
            controlButtons();
        };

        // const gukeiBackButton = MyButton({
        //     text: "前の愚形",
        //     width: 180,
        //     height: 50,
        //     fill: "white",
        //     fontColor: "black",
        //     stroke: "black",
        //     strokeWidth: 5,
        // }).addChildTo(this).setPosition(this.gridX.center(5.3), this.gridY.center(5.2));
        // gukeiBackButton.selected = function() {
        //     if (move === 0) return;
        //     for (let i = move - 1; i >= 0; i--) {
        //         if (gukeiList[i] !== null) {
        //             const m = gukeiList[i].move - 1;
        //             board = boards[m].board;
        //             drawAllStones(boards[m].lastX, boards[m].lastY);
        //             move = m;
        //             break;
        //         }
        //     }
        //     updateGukeiLabel();
        //     controlButtons();
        // };

        const backButton = MyButton({
            text: "<",
            width: 80,
            height: 120,
            fill: "white",
            fontSize: 28,
            fontColor: "black",
            stroke: "black",
            strokeWidth: 5,
        }).addChildTo(this).setPosition(this.gridX.center(4.1), this.gridY.center(5.8));
        backButton.selected = function() {
            if (move === 0) return;
            move -= 1;
            board = boards[move].board;
            drawAllStones(boards[move].lastX, boards[move].lastY);
            updateGukeiLabel();
            controlButtons();
        };

        const forwardButton = MyButton({
            text: ">",
            width: 80,
            height: 120,
            fill: "white",
            fontSize: 28,
            fontColor: "black",
            stroke: "black",
            strokeWidth: 5,
        }).addChildTo(this).setPosition(this.gridX.center(6.5), this.gridY.center(5.8));
        forwardButton.selected = function() {
            if (move === boards.length - 1) {
                return;
            }
            move += 1;
            board = boards[move].board;
            drawAllStones(boards[move].lastX, boards[move].lastY);
            updateGukeiLabel();
            controlButtons();
        };

        const endButton = MyButton({
            text: "終了",
            width: 80,
            height: 50,
            fill: "white",
            fontSize: 28,
            fontColor: "black",
            stroke: "black",
            strokeWidth: 5,
        }).addChildTo(this).setPosition(this.gridX.center(6.5), this.gridY.center(7.5));
        endButton.selected = function() {
            self.exit("TitleScene");
        };

        function updateGukeiLabel() {
            if (gukeiList[move] !== null) {
                gukeiLabel.text = gukeiList[move].title;
                gukeiLabel.fontFamily = gukeiList[move].fontFamily;
                gukeiLabel.fontSize = gukeiList[move].fontSize;
                // gukeiLabel.tweener.by({y: -30}, 30).by({y: 30}, 1000, "easeOutElastic").play();
                if (boards[move].lastY < BOARD_SIZE / 2) {
                    gukeiLabel.setPosition(self.gridX.center(0), self.gridY.center());
                } else {
                    gukeiLabel.setPosition(self.gridX.center(0), self.gridY.center(-4));
                }

                const floor = Math.floor(self.banLayer.size / 2);
                const line = Sprite("line");
                line.addChildTo(self.banLayer)
                .setPosition(self.banLayer.grid.span(boards[move].lastX - floor), self.banLayer.grid.span(boards[move].lastY - floor));
                // line.tweener.to({alpha:0}, 1000, "easeInQuint").play();
                const spliteName = "face" + Math.randint(2, 4);
                faceSprite.setImage(spliteName);
            } else {
                gukeiLabel.text = "";
                faceSprite.setImage("face1");
            }
        }

        const faceSprite = Sprite("face1");
        faceSprite.addChildTo(this).setPosition(this.gridX.center(-2.6), this.gridY.center(5.3));

        const gukeiLabel = Label({
            text: "",
            fontSize: 100,
            fill: "white",
            fontWeight: "bold",
            strokeWidth: 20,
            stroke: "black",
        }).addChildTo(this).setPosition(this.gridX.center(0), this.gridY.center(3.5));

        controlButtons();


    },

});


phina.define('MyButton', {
    superClass: 'Button',
    init: function(param) {
        this.superInit(param);

        const self = this;

        self.pointOn = false;

        const a = PathShape({
            paths:[Vector2(-1 * this.width/2 + 4, this.height/2 - 2), Vector2(this.width/2 - 4, this.height/2 - 2)],
            stroke: "black",
        })
        .addChildTo(this).setPosition(0, 0);
        a.alpha = 0.2;

        const b = PathShape({
            paths:[Vector2(-1 * this.width/2 + 4, - 1 * this.height/2 + 2), Vector2(this.width/2 - 4, -1 * this.height/2 + 2)],
            stroke: "white",
        })
        .addChildTo(this).setPosition(0, 0);
        b.alpha = 0.2;

        this.selected = null;

        this.on("pointstart", () => {
            self.pointOn = true;
            self.tweener.to({scaleX: 0.95, scaleY: 0.95}, 10).play();
        });
        this.on("pointend", () => {
            if (!self.pointOn) return;
            if (!self.visible) return;
            self.tweener.to({scaleX: 1, scaleY: 1}, 10)
            .call(() => {
                if (self.selected) {
                    self.selected();
                }
            })
            .play();
        });
        this.on("pointout", () => {
            self.pointOn = false;
            self.tweener.to({scaleX: 1, scaleY: 1}, 10).play();
        });

    },
});


// SGFパーサ
// https://github.com/Mistereo/sgfjs/blob/master/index.js
function SgfParser() {

    function isWhitespace(c) {
        return /^\s$/.test(c);
    }

    function isEscape(c) {
        return /^\\$/.test(c);
    }

    function isAlpha(c) {
        return /^[a-zA-Z]$/.test(c);
    }

    function createSource(sgf) {
        var data = sgf.split('');
        var position = 0;

        function peek() {
            if (position >= data.length) {
            throw new Error('Unexpected end of input.');
            }
            return data[position];
        }

        function next() {
            position++;
            return position < data.length;
        }

        function skipws() {
            while (isWhitespace(peek()) && next());
        }

        return {
            peek: peek,
            next: next,
            skipws: skipws
        };
    }

    function parseIdent(source) {
        source.skipws();

        var ident = '';
        while (isAlpha(source.peek())) {
            ident += source.peek();
            source.next();
        }

        return ident;
    }

    function parseSingleValue(source) {
        source.skipws();

        source.next();
        var value = '';
        while (source.peek() != ']') {
            if (isEscape(source.peek())) {
            source.next();
            }

            value += source.peek();
            source.next();
        }

        source.next();
        return value;
    }

    function parseValue(source) {
        source.skipws();

        var values = [];
        while (source.peek() == '[') {
            var value = parseSingleValue(source);
            values.push(value);
            source.skipws();
        }
        return (values.length === 1) ? values[0] : values;
    }

    function parseProperty(source) {
        source.skipws();

        var ident = parseIdent(source);
        var value = parseValue(source);
        return {
            ident: ident,
            value: value
        };
    }

    function parseNode(source) {
        source.next();

        var node = {
            props: {},
            childs: []
        };

        while (true) {
            source.skipws();
            if (!isAlpha(source.peek())) {
            break;
            }

            var property = parseProperty(source);
            node.props[property.ident] = property.value;
        }

        return node;
    }

    function parseTree(source) {
        source.skipws();
        if (source.peek() !== '(') {
            throw new Error('Expected "(", got "' + source.peek() + '"');
        }
        source.next();

        var tree = null;
        var cursor = null;

        while (source.peek() !== ')') {
            switch (source.peek()) {
            case ';':
                var node = parseNode(source);

                if (cursor) {
                cursor.childs.push(node);
                } else {
                tree = node;
                }

                cursor = node;
                break;
            case '(':
                var node = parseTree(source);
                cursor.childs.push(node);
                break;
            default:
                if (!isWhitespace(source.peek())) {
                throw new Error('Malformed input.');
                }
                source.next();
                break;
            }
        }

        source.next();
        return tree;
    }

    function parse(sgf) {
        return parseTree(createSource(sgf));
    }

    this.parse = parse;

}



ASSETS = {
    image: {
        "title": "title.png",
        "line": "line.png",
        "face1": "face1.png",
        "face2": "face2.png",
        "face3": "face3.png",
        "face4": "face4.png",
    }
};

phina.main(function() {
    App = GameApp({
        assets: ASSETS,
        startLabel: 'TitleScene',
        scenes: [
            {
                label: 'TitleScene',
                className: 'TitleScene',
            },
            {
                label: 'GameScene',
                className: 'GameScene',
            },
        ],
    });

    App.fps = 60;

    App.run();

});
